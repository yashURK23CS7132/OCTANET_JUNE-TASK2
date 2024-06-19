document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const taskInput = document.getElementById('task-input').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value;

    const taskItem = document.createElement('li');
    taskItem.className = `priority-${priority}`;
    taskItem.setAttribute('data-priority', priority);
    taskItem.setAttribute('data-category', category);
    taskItem.innerHTML = `
        <span>${taskInput} - ${category} - ${dueDate}</span>
        <div>
            <button class="complete">Complete</button>
            <button class="delete">Delete</button>
        </div>
    `;

    document.getElementById('task-list').appendChild(taskItem);

    document.getElementById('task-input').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('priority').value = 'low';
    document.getElementById('category').value = 'work';
});

document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
    } else if (e.target.classList.contains('complete')) {
        e.target.parentElement.parentElement.classList.toggle('completed');
    }
});

document.getElementById('filter-priority').addEventListener('change', filterTasks);
document.getElementById('filter-category').addEventListener('change', filterTasks);

function filterTasks() {
    const filterPriority = document.getElementById('filter-priority').value;
    const filterCategory = document.getElementById('filter-category').value;

    const tasks = document.querySelectorAll('#task-list li');

    tasks.forEach(task => {
        const taskPriority = task.getAttribute('data-priority');
        const taskCategory = task.getAttribute('data-category');

        if ((filterPriority === 'all' || filterPriority === taskPriority) &&
            (filterCategory === 'all' || filterCategory === taskCategory)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}
