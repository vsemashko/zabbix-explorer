let taskTimer;

function scheduleTask(task, interval) {
    if (taskTimer) {
        clearTimeout(taskTimer);
    }

    taskTimer = setTimeout(() => {
        task();
        scheduleTask(task, interval);
    }, interval);
}

module.exports = scheduleTask;