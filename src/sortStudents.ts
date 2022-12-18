
export interface Student {
  name: string,
  surname: string,
  age: number,
  married: boolean,
  grades: number[],
}

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'averageGrade',
}

export type SortOrder = 'asc'| 'desc';

function findAverageGrade(grades: number[]): number {
  return grades.reduce((sum: number, grade: number) => {
    return sum + grade;
  }, 0) / grades.length;
}

export function sortStudents(
  students: Student [],
  sortBy: SortType,
  order: SortOrder,
): Student[] {
  return [...students]
    .sort((firstStudent, secondStudent) => {
      switch (sortBy) {
        case SortType.Name:
        case SortType.Surname:
          return firstStudent[sortBy].localeCompare(secondStudent[sortBy]);
        case SortType.Age:
          return order === 'asc'
            ? firstStudent.age - secondStudent.age
            : secondStudent.age - firstStudent.age;

        case SortType.Married:
          return order === 'asc'
            ? Number(firstStudent.married) - Number(secondStudent.married)
            : Number(secondStudent.married) - Number(firstStudent.married);

        case SortType.AverageGrade:
          return order === 'asc'
            ? findAverageGrade(firstStudent.grades)
              - findAverageGrade(secondStudent.grades)
            : findAverageGrade(secondStudent.grades)
              - findAverageGrade(firstStudent.grades);

        default:
          return 0;
      }
    });
}
