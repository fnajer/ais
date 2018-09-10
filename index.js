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
  console.log(teachersByPair);
  const schedule = spreadByDay(teachersByPair, hours / 2);
  
  showSchedule(schedule);
}

function showSchedule(schedule) {
  for(let i = 0; i < schedule.length; i++) {
    console.log(schedule[i].title);
    for(let j = 0; j < schedule[i].pairs.length; j++) {
      console.log(schedule[i].pairs[j]);
    }
  }
}

function spreadByDay(teachersByPair, pairs) {
  const averagePairsOnDay = pairs / days.length;
  console.log(teachersByPair);
  for(let i = 0; i < days.length; i++) {console.log(days[i].title);
    for(let j = 0; j < averagePairsOnDay; j++) {
      const onePair = {...teachersByPair[j]};
      teachersByPair = teachersByPair.filter(pair => pair !== teachersByPair[j]);
      //teachersByPair.shift();
      
      days[i].pairs.push(onePair);console.log(days[i].pairs[j]);
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

