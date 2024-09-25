// JavaScript for action button functionality
document.addEventListener('DOMContentLoaded', () => {
    // Dummy data for demonstration purposes
    const rooms = [
        { id: 1, name: 'Simple Room', area: '250 sq. ft.', guests: '5 Adults, 3 Children', price: '₹300', quantity: 10, status: 'active' },
        { id: 2, name: 'Deluxe Room', area: '300 sq. ft.', guests: '3 Adults, 2 Children', price: '₹500', quantity: 10, status: 'active' },
        { id: 3, name: 'Luxury Room', area: '600 sq. ft.', guests: '8 Adults, 6 Children', price: '₹600', quantity: 2, status: 'active' },
        { id: 4, name: 'Supreme Deluxe Room', area: '500 sq. ft.', guests: '9 Adults, 10 Children', price: '₹900', quantity: 12, status: 'active' },
    ];

    // Edit button functionality
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const roomId = getRoomId(event.target);
            const room = rooms.find(r => r.id === roomId);
            if (room) {
                const newName = prompt('Edit room name:', room.name);
                if (newName) {
                    room.name = newName; // Update the room name (mock functionality)
                    alert(`Room name updated to: ${room.name}`);
                    updateTable(); // Update the table display after edit
                }
            }
        });
    });

    // View button functionality
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const roomId = getRoomId(event.target);
            const room = rooms.find(r => r.id === roomId);
            if (room) {
                alert(`Room Details:\nName: ${room.name}\nArea: ${room.area}\nGuests: ${room.guests}\nPrice: ${room.price}\nQuantity: ${room.quantity}\nStatus: ${room.status}`);
            }
        });
    });

    // Delete button functionality
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const roomId = getRoomId(event.target);
            const confirmed = confirm('Are you sure you want to delete this room?');
            if (confirmed) {
                // Simulate room deletion
                const index = rooms.findIndex(r => r.id === roomId);
                if (index > -1) {
                    rooms.splice(index, 1); // Remove room from array
                    alert(`Room with ID: ${roomId} deleted successfully.`); // Mock deletion
                    updateTable(); // Update the table display after deletion
                }
            }
        });
    });

    // Helper function to get room ID based on the button clicked
    function getRoomId(target) {
        const row = target.closest('tr'); // Get the closest table row
        return parseInt(row.cells[0].textContent); // Assuming the first cell contains the room ID
    }

    // Function to update the table display
    function updateTable() {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows
        rooms.forEach(room => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${room.id}</td>
                <td>${room.name}</td>
                <td>${room.area}</td>
                <td>${room.guests}</td>
                <td>${room.price}</td>
                <td>${room.quantity}</td>
                <td><span class="status ${room.status}">${room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span></td>
                <td>
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="view-btn"><i class="fas fa-eye"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
        // Reattach event listeners for new buttons
        attachButtonListeners();
    }

    // Function to attach event listeners to the buttons in the updated table
    function attachButtonListeners() {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const roomId = getRoomId(event.target);
                const room = rooms.find(r => r.id === roomId);
                if (room) {
                    const newName = prompt('Edit room name:', room.name);
                    if (newName) {
                        room.name = newName; // Update the room name (mock functionality)
                        alert(`Room name updated to: ${room.name}`);
                        updateTable(); // Update the table display after edit
                    }
                }
            });
        });

        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const roomId = getRoomId(event.target);
                const room = rooms.find(r => r.id === roomId);
                if (room) {
                    alert(`Room Details:\nName: ${room.name}\nArea: ${room.area}\nGuests: ${room.guests}\nPrice: ${room.price}\nQuantity: ${room.quantity}\nStatus: ${room.status}`);
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const roomId = getRoomId(event.target);
                const confirmed = confirm('Are you sure you want to delete this room?');
                if (confirmed) {
                    const index = rooms.findIndex(r => r.id === roomId);
                    if (index > -1) {
                        rooms.splice(index, 1); // Remove room from array
                        alert(`Room with ID: ${roomId} deleted successfully.`); // Mock deletion
                        updateTable(); // Update the table display after deletion
                    }
                }
            });
        });
    }
});
