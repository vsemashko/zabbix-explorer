let taskTimer;

function scheduleTask(task, interval, initialInterval = interval) {
    if (taskTimer) {
        clearTimeout(taskTimer);
    }

    taskTimer = setTimeout(() => {
        task();
        scheduleTask(task, interval);
    }, initialInterval);
}

module.exports = scheduleTask;