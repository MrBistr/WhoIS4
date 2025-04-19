document.addEventListener('DOMContentLoaded', function() {
    const addNodeBtn = document.getElementById('add-node-btn');
    const nodeFormContainer = document.getElementById('node-form-container');
    const cancelBtn = document.getElementById('cancel-btn');
    const nodeForm = document.getElementById('node-form');
    const networkContainer = document.getElementById('network-container');
    const mainNode = document.getElementById('main-node');

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
        const imageInput = document.getElementById('node-image');
        const newNode = document.createElement('div');
        newNode.classList.add('node');

        // Random color generator
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        newNode.style.backgroundColor = randomColor;

        // Add text and image
        if (imageInput.files.length > 0) {
            const image = document.createElement('img');
            image.src = URL.createObjectURL(imageInput.files[0]);
            image.style.width = '100%';
            image.style.height = '100%';
            image.style.borderRadius = '50%';
            newNode.appendChild(image);
        } else {
            newNode.textContent = `${name}\n${job}`;
        }

        // Add node to the container
        newNode.style.top = `${Math.random() * 80}%`;
        newNode.style.left = `${Math.random() * 80}%`;
        networkContainer.appendChild(newNode);

        // Draw a line connecting to the main node
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.backgroundColor = randomColor;

        const mainRect = mainNode.getBoundingClientRect();
        const newNodeRect = newNode.getBoundingClientRect();
        const x1 = mainRect.left + mainRect.width / 2;
        const y1 = mainRect.top + mainRect.height / 2;
        const x2 = newNodeRect.left + newNodeRect.width / 2;
        const y2 = newNodeRect.top + newNodeRect.height / 2;

        const length = Math.hypot(x2 - x1, y2 - y1);
        line.style.width = `${length}px`;
        line.style.top = `${y1}px`;
        line.style.left = `${x1}px`;
        line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;

        networkContainer.appendChild(line);

        // Clear form and hide it
        nodeForm.reset();
        nodeFormContainer.classList.add('hidden');
    });
});