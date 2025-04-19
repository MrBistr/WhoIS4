document.addEventListener('DOMContentLoaded', function() {
    const addNodeBtn = document.getElementById('add-node-btn');
    const nodeFormContainer = document.getElementById('node-form-container');
    const cancelBtn = document.getElementById('cancel-btn');
    const nodeForm = document.getElementById('node-form');
    const networkContainer = document.getElementById('network-container');

    // Show form
    addNodeBtn.addEventListener('click', () => {
        nodeFormContainer.classList.remove('hidden');
    });

    // Hide form
    cancelBtn.addEventListener('click', () => {
        nodeFormContainer.classList.add('hidden');
    });

    // Add new node
    nodeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('node-name').value;
        const job = document.getElementById('node-job').value;
        const color = document.getElementById('node-color').value;

        const node = document.createElement('div');
        node.classList.add('node');
        node.style.backgroundColor = color;
        node.textContent = `${name}\n${job}`;
        networkContainer.appendChild(node);

        // Clear form and hide it
        nodeForm.reset();
        nodeFormContainer.classList.add('hidden');
    });
});