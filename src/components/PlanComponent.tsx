import React, { useState } from "react";
import { FilterValues } from "../interfaces/FilterValues";

import { Plan } from "../interfaces/Plan";

const getWeekDay = (date: Date): string => {
  let weekday = new Array(7);
  weekday[0] = "Sonntag";
  weekday[1] = "Montag";
  weekday[2] = "Dienstag";
  weekday[3] = "Mittwoch";
  weekday[4] = "Donnerstag";
  weekday[5] = "Freitag";
  weekday[6] = "Samstag";
  return weekday[date.getDay()];
};
const getMonthName = (date: Date): string => {
  const month: { [key: number]: string } = {
    0: "Januar",
    1: "Februar",
    2: "März",
    3: "April",
    4: "Mai",
    5: "Juni",
    6: "Juli",
    7: "August",
    8: "September",
    9: "Oktober",
    10: "November",
    11: "Dezember",
  };
  return month[date.getMonth()];
};

const filterRow = (
  filterValues: FilterValues,
  klasse: string,
  lehrer: string,
  vert_lehrer: string,
  fach: string
) => {
  const klasseFilter = filterValues.class
    ? klasse
        .toLowerCase()
        .replace(/\s/g, "")
        .indexOf(filterValues.class.toLocaleLowerCase()) > -1
    : true;
  const fachFilter =
    filterValues.courses.length > 0
      ? filterValues.courses
          .toString()
          .toLowerCase()
          .indexOf(fach.toLowerCase().replace(/\s/g, "")) > -1
      : true;
  const lehrerFilter = filterValues.key
    ? lehrer.toLowerCase().replace(/\s/g, "") ===
        filterValues.key.toLocaleLowerCase() ||
      vert_lehrer.toLowerCase().replace(/\s/g, "") ===
        filterValues.key.toLowerCase()
    : true;

  return !klasseFilter || !fachFilter || !lehrerFilter;
};

interface PlanComponentProps {
  plan: Plan;
  index: number;
  filterValues: FilterValues;
}

export const PlanComponent: React.FC<PlanComponentProps> = ({
  plan: { date, array },
  index,
  filterValues,
}) => {
  const [expanded, setExpaneded] = useState(index === 0);

  return (
    <li onClick={() => setExpaneded(!expanded)}>
      <h1>{getWeekDay(date)}</h1>
      <p>
        {date.getDate()}.{getMonthName(date)}
      </p>
      <table className={expanded ? "" : "hidden"}>
        <tbody>
          <tr>
            <th>Klasse</th>
            <th>Stun</th>
            <th>Vert</th>
            <th>Lehrer</th>
            <th>Fach</th>
            <th>Raum</th>
            <th>Text</th>
          </tr>
          {array.map(
            ({ klasse, stunde, vert_lehrer, lehrer, fach, raum, text }) =>
              !filterRow(filterValues, klasse, lehrer, vert_lehrer, fach) && (
                <tr
                  key={`${klasse}${stunde}${vert_lehrer}${lehrer}${fach}${raum}${text}`}
                  className={`vertretung ${raum === "---" ? "entfall" : ""}`}
                >
                  <td className="klasse">{klasse}</td>
                  <td className="stunde">{stunde}</td>
                  <td className="vert_lehrer">{vert_lehrer}</td>
                  <td className="lehrer">{lehrer}</td>
                  <td className="fach">{fach}</td>
                  <td className="raum">{raum}</td>
                  <td className="text">{text}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </li>
  );
};
