document.addEventListener('DOMContentLoaded', function () {
    const addNodeBtn = document.getElementById('add-node-btn');
    const addGroupBtn = document.getElementById('add-group-btn');
    const nodeFormContainer = document.getElementById('node-form-container');
    const groupFormContainer = document.getElementById('group-form-container');
    const cancelNodeBtn = document.getElementById('cancel-node-btn');
    const cancelGroupBtn = document.getElementById('cancel-group-btn');
    const nodeForm = document.getElementById('node-form');
    const groupForm = document.getElementById('group-form');
    const networkContainer = document.getElementById('network-container');
    let mainNode = null;

    // Show Node Form
    addNodeBtn.addEventListener('click', () => {
        nodeFormContainer.classList.remove('hidden');
    });

    // Show Group Form
    addGroupBtn.addEventListener('click', () => {
        groupFormContainer.classList.remove('hidden');
    });

    // Hide Node Form
    cancelNodeBtn.addEventListener('click', () => {
        nodeFormContainer.classList.add('hidden');
    });

    // Hide Group Form
    cancelGroupBtn.addEventListener('click', () => {
        groupFormContainer.classList.add('hidden');
    });

    // Add Node
    nodeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        createNode();
        nodeFormContainer.classList.add('hidden'); // Close form after submit
    });

    // Add Group
    groupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        createGroup();
        groupFormContainer.classList.add('hidden'); // Close form after submit
    });

    function createNode() {
        const name = document.getElementById('node-name').value;
        const job = document.getElementById('node-job').value;
        const imageInput = document.getElementById('node-image');
        const node = document.createElement('div');
        node.classList.add('node');
        node.setAttribute('draggable', true);

        const textContainer = document.createElement('div');
        textContainer.classList.add('text');
        textContainer.innerHTML = `<div>${name}</div><div>${job}</div>`;
        node.appendChild(textContainer);

        // Add image or color
        if (imageInput.files.length > 0) {
            const image = document.createElement('img');
            image.src = URL.createObjectURL(imageInput.files[0]);
            image.style.width = '100%';
            image.style.height = '100%';
            image.style.borderRadius = '50%';
            node.appendChild(image);
        } else {
            node.style.backgroundColor = randomColor();
        }

        positionNode(node);
        networkContainer.appendChild(node);

        if (mainNode) {
            drawConnection(mainNode, node);
        } else {
            mainNode = node;
            mainNode.classList.add('main-node');
            mainNode.style.top = '50%';
            mainNode.style.left = '50%';
            mainNode.style.transform = 'translate(-50%, -50%)';
        }

        enableDragAndDrop(node);
    }

    function createGroup() {
        const name = document.getElementById('group-name').value;
        const group = document.createElement('div');
        group.classList.add('group');
        group.textContent = name;
        positionNode(group);
        networkContainer.appendChild(group);

        enableDragAndDrop(group);
    }

    function positionNode(node) {
        // Ensure no overlap
        let top, left;
        do {
            top = Math.random() * 70 + 10;
            left = Math.random() * 70 + 10;
        } while (isOverlapping(top, left));
        node.style.top = `${top}%`;
        node.style.left = `${left}%`;
    }

    function isOverlapping(top, left) {
        const nodes = document.querySelectorAll('.node, .group');
        for (const otherNode of nodes) {
            const rect = otherNode.getBoundingClientRect();
            const nodeTop = parseFloat(top);
            const nodeLeft = parseFloat(left);
            if (
                Math.abs(nodeTop - rect.top) < 100 &&
                Math.abs(nodeLeft - rect.left) < 100
            ) {
                return true; // Overlapping
            }
        }
        return false;
    }

    function drawConnection(node1, node2) {
        const line = document.createElement('div');
        line.classList.add('line');

        const node1Rect = node1.getBoundingClientRect();
        const node2Rect = node2.getBoundingClientRect();
        const x1 = node1Rect.left + node1Rect.width / 2;
        const y1 = node1Rect.top + node1Rect.height / 2;
        const x2 = node2Rect.left + node2Rect.width / 2;
        const y2 = node2Rect.top + node2Rect.height / 2;

        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1);

        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}rad)`;
        line.style.top = `${y1}px`;
        line.style.left = `${x1}px`;

        networkContainer.appendChild(line);
    }

    function enableDragAndDrop(element) {
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
        });

        element.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        element.addEventListener('drop', (e) => {
            e.preventDefault();
            const target = e.target;
            const draggedElementId = e.dataTransfer.getData('text');
            const draggedElement = document.getElementById(draggedElementId);

            if (draggedElement && (target.classList.contains('node') || target.classList.contains('group'))) {
                positionNode(draggedElement);
                drawConnection(target, draggedElement);
            }
        });
    }

    function randomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
});