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
console.log(splitTeachersByPair(teachers));

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

