const days = [{
  title: 'Monday',
  pairs: [],
}, {
  title: 'Tuesday',
  pairs: [],
}, {
  title: 'Wednesday',
  pairs: [],
}, {
  title: 'Thursday',
  pairs: [],
}, {
  title: 'Friday',
  pairs: [],
}];

const teachers = [{
  name: 'Мальцев Ярослав Иванович',
  hours: 10,
  discipline: 'ОС',
}, {
  name: 'Суворова',
  hours: 6,
  discipline: 'Параллельные вычисления',
}, {
  name: 'Шкандыбин',
  hours: 6,
  discipline: 'Java',
}, {
  name: 'Капустин',
  hours: 6,
  discipline: 'Базы данных',
}, {
  name: 'Швыров',
  hours: 6,
  discipline: 'Криптогарфия',
}, {
  name: 'Сентяй',
  hours: 6,
  discipline: 'Компас',
}];

let hours = 0;
teachers.forEach(teacher => {
  hours += teacher.hours
});

generateSchedule(teachers);

function generateSchedule(teachers) {
  const teachersByPair = splitTeachersByPair(teachers);
  teachersByPair.sort(randomSort);

  const schedule = spreadByDay(teachersByPair, hours / 2, true);
  showSchedule(schedule);
  combineRelatedPairs(schedule);
  showSchedule(schedule);
  debugger;
}

function showSchedule(schedule) {
  for (let i = 0; i < schedule.length; i++) {
    console.log(schedule[i].title);
    for (let j = 0; j < schedule[i].pairs.length; j++) {
      console.log(schedule[i].pairs[j]);
    }
  }
}

function combineRelatedPairs(schedule) {
  for (let i = 0; i < schedule.length; i++) {
    const repeatingPairs = findRepeatPairs(schedule[i].pairs);
    deleteRepeatPairs(schedule[i].pairs, repeatingPairs);
  }
}

function spreadByDay(teachersByPair, pairs, pairsIsCloser = false) {
  const averagePairsOnDay = pairs / days.length;

  for(let i = 0, k = 0; i < days.length; i++) {

    // if(pairsIsCloser) {
    //   combineRelatedPairs(teachersByPair[k]);
    // }

    for(let j = 0; j < averagePairsOnDay; j++, k++) {
      const onePair = {...teachersByPair[k]};
      
      days[i].pairs.push(onePair);
    }
  }

  return days;
}

function randomSort(a, b) {
  return Math.random() - 0.5;
}

function splitTeachersByPair(teachers) {
  let splittedTeachers = [];

  for (let i = 0; i < teachers.length; i++) {
    const splittedTeacher = splitTeacher(teachers[i]);
    splittedTeachers = splittedTeachers.concat(splittedTeacher);
  }

  return splittedTeachers;
}

function splitTeacher(teacher) {
  const splittedTeacher = [];
  const pairs = teacher.hours / 2;

  for (let i = 0; i < pairs; i++) {
    const onePair = {...teacher, hours: 2};
    splittedTeacher.push(onePair);
  }

  return splittedTeacher;
};

function deleteRepeatPairs(arr, repeatedValues) {
  let firstValueIndex = null;
  for (let i = 0; i < repeatedValues.length; i++) {
    for(let j = 0; j < arr.length; j++) {
        if (repeatedValues[i].name == arr[j].name) {
            if(firstValueIndex === null) {
              firstValueIndex = j; // пригодится потом возможно, это первое значение повторяющееся
                  continue; // мы кстати никак не завязаны на repeat - это может минус(а вдруг лучше удалять не все повторы, а именно по подсчету), а может и плюс(без него можно)
            }
              let deletedElem = arr.splice(j, 1);
              arr.splice(firstValueIndex, 0, deletedElem[0]);
          }
      }
      firstValueIndex = null;
  }
}

function findRepeatPairs(arr) {
  let uniqueArr = unique(arr);
  let repeatedValues = uniqueArr.map(elem => {
    return {name: elem, repeat: 0}
  });
  for (let i = 0; i < repeatedValues.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if(arr[i].name === arr[j].name) {
            repeatedValues[i].repeat = repeatedValues[i].repeat + 1;
          }
      }
  }
  repeatedValues = repeatedValues.filter(elem => elem.repeat > 1);
  return repeatedValues;
}

function unique(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var str = arr[i].name;
    obj[str] = true;
  }

  return Object.keys(obj);
}
