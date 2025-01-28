const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export type Day = (typeof days)[number];

export type Availibility = {
  day?: Day;
  hour?: string;
  date: Date;
  active?: boolean;
};

export type Availabilities = Record<string, Availibility[]>;

export function getNextWeekAvailabilities(
  activeDays: Day[],
  hours: string[]
): Availabilities {
  const availabilities: Availabilities = {};
  const today = new Date();
  const currentDayOfWeek = today.getDay();

  const daysUntilNextMonday =
    today.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1) + 7;
  const nextMonday = new Date(today.setDate(daysUntilNextMonday));

  const parsedHours = hours.map((hour) => {
    const [hourPart, minutePart] = hour.split(':').map(Number);
    return { hour: hourPart, minute: minutePart };
  });

  for (const activeDay of activeDays) {
    const dayDifference = (days.indexOf(activeDay) - 1 + 7) % 7;
    const specificDate = new Date(nextMonday);
    specificDate.setDate(nextMonday.getDate() + dayDifference);

    for (const { hour, minute } of parsedHours) {
      if (!availabilities[activeDay]) {
        availabilities[activeDay] = [];
      }
      const availability = {
        day: activeDay,
        hour: `${hour}:${minute.toString().padStart(2, '0')}`,
        date: new Date(
          specificDate.getFullYear(),
          specificDate.getMonth(),
          specificDate.getDate(),
          hour,
          minute
        ),
        active: false,
      };

      availabilities[activeDay].push(availability);
    }
  }
  return availabilities;
}

export function getFirstAndLastDay(availibilities: Availabilities): {
  firstDay: Date;
  lastDay: Date;
} {
  let minDate = Number.POSITIVE_INFINITY;
  let maxDate = Number.NEGATIVE_INFINITY;

  for (const day of Object.values(availibilities)) {
    for (const availability of day) {
      const time = availability.date.getTime();
      if (time < minDate) {
        minDate = time;
      }
      if (time > maxDate) {
        maxDate = time;
      }
    }
  }

  return {
    firstDay: new Date(minDate),
    lastDay: new Date(maxDate),
  };
}
