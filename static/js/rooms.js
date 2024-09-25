document.addEventListener('DOMContentLoaded', function () {
    const roomsData = document.getElementById('rooms-data');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const chkAvailBtn = document.getElementById('chk_avail_btn');
    const adultsInput = document.getElementById('adults');
    const childrenInput = document.getElementById('children');
    const guestsBtn = document.getElementById('guests_btn');
    const facilitiesBtn = document.getElementById('facilities_btn');

    // Fetch rooms based on user input
    function fetchRooms() {
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const adults = adultsInput.value;
        const children = childrenInput.value;
        const facilities = Array.from(document.querySelectorAll('[name="facilities"]:checked')).map(facility => facility.value);

        const url = `/fetch-rooms/?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}&facility_list=${JSON.stringify({ facilities })}`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onprogress = function () {
            roomsData.innerHTML = `
                <div class="spinner-border text-info mb-3 d-block mx-auto" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            `;
        };

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                roomsData.innerHTML = xhr.responseText; // Update with the fetched room data
            } else {
                roomsData.innerHTML = `<p class="text-danger">Error fetching rooms. Please try again later.</p>`;
            }
        };

        xhr.send();
    }

    // Check availability and fetch rooms if applicable
    function chkAvailFilter() {
        if (checkinInput.value && checkoutInput.value) {
            fetchRooms();
            chkAvailBtn.classList.remove('d-none');
        }
    }

    // Clear check-in and check-out fields
    function chkAvailClear() {
        checkinInput.value = '';
        checkoutInput.value = '';
        chkAvailBtn.classList.add('d-none');
        fetchRooms();
    }

    // Filter based on number of guests
    function guestsFilter() {
        if (adultsInput.value > 0 || childrenInput.value > 0) {
            fetchRooms();
            guestsBtn.classList.remove('d-none');
        } else {
            guestsClear();
        }
    }

    // Clear guest inputs
    function guestsClear() {
        adultsInput.value = '';
        childrenInput.value = '';
        guestsBtn.classList.add('d-none');
        fetchRooms();
    }

    // Clear selected facilities
    function facilitiesClear() {
        document.querySelectorAll('[name="facilities"]:checked').forEach(facility => {
            facility.checked = false;
        });
        facilitiesBtn.classList.add('d-none');
        fetchRooms();
    }

    // Event Listeners
    checkinInput.addEventListener('change', chkAvailFilter);
    checkoutInput.addEventListener('change', chkAvailFilter);
    adultsInput.addEventListener('input', guestsFilter);
    childrenInput.addEventListener('input', guestsFilter);

    // Initialize room data on page load
    fetchRooms();
});
