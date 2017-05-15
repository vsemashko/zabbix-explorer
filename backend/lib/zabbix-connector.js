const config = require('config');
const Zabbix = require('zabbix-promise');

const zabbix = new Zabbix(
    config.get('zabbix-config:url'),
    config.get('zabbix-config:user'),
    config.get('zabbix-config:password')
);

zabbix.login()
    .then(() => console.log('Succesfully connected to zabbix'))
    .catch((reason) => console.log(JSON.stringify(reason, null, 2)));

function getAvailabilityReport(from, to) {
    zabbix.request('trigger.get', {
        active: true,
        sortfield: ['hostname', 'description']
    }).then(triggers => {
        let reportRecords = [];
        triggers.forEach(trigger => {
            let record = {};
            //let availability = calculateAvailability(trigger['triggerid'], from, to);
            let availability = {};
            record.host = trigger['hosts'][0]['name'];
            record.description = trigger['description'];
            record.success = availability['true'];
            record.failure = availability['false'];
            reportRecords.push(record);
        })
    });
}

/*function calculateAvailability(triggerId, from, to) {
    const TRIGGER_VALUE_FALSE = 0;
    const TRIGGER_VALUE_TRUE = 1;
    const EVENT_SOURCE_TRIGGERS = 0;
    const EVENT_OBJECT_TRIGGER = 0;
    startValue = TRIGGER_VALUE_FALSE;

    if (from > 0 && from <= Date.now()) {
        sql = 'SELECT e.eventid,e.value'.
        ' FROM events e'.
        ' WHERE e.objectid='.zbx_dbstr($triggerId).
        ' AND e.source='.EVENT_SOURCE_TRIGGERS.
        ' AND e.object='.EVENT_OBJECT_TRIGGER.
        ' AND e.clock<'.zbx_dbstr(from).
        ' ORDER BY e.eventid DESC';
        if ($row = DBfetch(DBselect(sql, 1))) {
            startValue = $row['value'];
            $min = from;
        }
    }

    sql = 'SELECT COUNT(e.eventid) AS cnt,MIN(e.clock) AS min_clock,MAX(e.clock) AS max_clock'.
    ' FROM events e'.
    ' WHERE e.objectid='.zbx_dbstr($triggerId).
    ' AND e.source='.EVENT_SOURCE_TRIGGERS.
    ' AND e.object='.EVENT_OBJECT_TRIGGER;
    if (from) {
        sql .= ' AND e.clock>='.zbx_dbstr(from);
    }
    if (to) {
        sql .= ' AND e.clock<='.zbx_dbstr(to);
    }

    $dbEvents = DBfetch(DBselect(sql));
    if ($dbEvents['cnt'] > 0) {
        if (!isset($min)) {
            $min = $dbEvents['min_clock'];
        }
        $max = $dbEvents['max_clock'];
    }
    else {
        if (from == 0 && to == 0) {
            $max = time();
            $min = $max - SEC_PER_DAY;
        }
        else {
            $ret['true_time'] = 0;
            $ret['false_time'] = 0;
            $ret['true'] = (TRIGGER_VALUE_TRUE == startValue) ? 100 : 0;
            $ret['false'] = (TRIGGER_VALUE_FALSE == startValue) ? 100 : 0;
            return $ret;
        }
    }

    $state = startValue;
    $true_time = 0;
    $false_time = 0;
    $time = $min;
    if (from == 0 && to == 0) {
        $max = time();
    }
    if (to == 0) {
        to = $max;
    }

    $rows = 0;
    $dbEvents = DBselect(
        'SELECT e.eventid,e.clock,e.value'.
    ' FROM events e'.
    ' WHERE e.objectid='.zbx_dbstr($triggerId).
    ' AND e.source='.EVENT_SOURCE_TRIGGERS.
    ' AND e.object='.EVENT_OBJECT_TRIGGER.
    ' AND e.clock BETWEEN '.$min.' AND '.$max.
    ' ORDER BY e.eventid'
);
    while ($row = DBfetch($dbEvents)) {
        $clock = $row['clock'];
        $value = $row['value'];

        $diff = $clock - $time;
        $time = $clock;

        if ($state == 0) {
            $false_time += $diff;
            $state = $value;
        }
        elseif ($state == 1) {
            $true_time += $diff;
            $state = $value;
        }
        $rows++;
    }

    if ($rows == 0) {
        $trigger = get_trigger_by_triggerid($triggerId);
        $state = $trigger['value'];
    }

    if ($state == TRIGGER_VALUE_FALSE) {
        $false_time = $false_time + to - $time;
    }
    elseif ($state == TRIGGER_VALUE_TRUE) {
        $true_time = $true_time + to - $time;
    }
    $total_time = $true_time + $false_time;

    if ($total_time == 0) {
        $ret['true_time'] = 0;
        $ret['false_time'] = 0;
        $ret['true'] = 0;
        $ret['false'] = 0;
    }
    else {
        $ret['true_time'] = $true_time;
        $ret['false_time'] = $false_time;
        $ret['true'] = (100 * $true_time) / $total_time;
        $ret['false'] = (100 * $false_time) / $total_time;
    }

    return $ret;
}*/

module.exports.Zabbix = zabbix;
module.exports.getAvailabilityReport = getAvailabilityReport;