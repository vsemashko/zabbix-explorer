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

function cancelScheduler() {
    if (taskTimer) {
        clearTimeout(taskTimer);
    }
}

module.exports.scheduleTask = scheduleTask;
module.exports.cancelScheduler = cancelScheduler;