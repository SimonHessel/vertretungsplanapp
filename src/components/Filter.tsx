import React, { useState } from "react";
import { FaTag, FaTrash } from "react-icons/fa";
import { FilterValues } from "../interfaces/FilterValues";
import { User } from "../interfaces/User";

interface FilterProps {
  user: User;
  toggle: () => void;
  filterValues: FilterValues;
  setFilterValues: React.Dispatch<React.SetStateAction<FilterValues>>;
}

export const Filter: React.FC<FilterProps> = ({
  user: { username },
  toggle,
  filterValues,
  setFilterValues,
}) => {
  const [filter, setFilter] = useState<string>("");
  const [cache] = useState<FilterValues>(filterValues);

  const parseInput = () => {
    if (filter.length > 0) {
      if (isNaN(filter[0] as any)) {
        if (!filterValues.courses.includes(filter))
          setFilterValues({
            ...filterValues,
            courses: [...filterValues.courses, filter],
          });
      } else {
        setFilterValues({ ...filterValues, class: filter });
      }
      setFilter("");
    }
  };

  const removeFilter = (value: string) => {
    console.log(filterValues.class === value);
    if (filterValues.class === value || filterValues.key === value)
      setFilterValues({ courses: filterValues.courses });
    else {
      setFilterValues({
        ...filterValues,
        courses: filterValues.courses.filter((item) => item !== value),
      });
    }
  };

  return (
    <div className="filter">
      <div className="filterContent ">
        <div className="menu">
          <p
            onClick={() => {
              setFilterValues(cache);
              toggle();
            }}
            className="btn btn-Filter"
          >
            Abbrechen
          </p>
          <p
            onClick={() => {
              parseInput();
              toggle();
            }}
            className="btn btn-Filter"
          >
            Speichern
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            parseInput();
          }}
        >
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={
              username.includes("mpg") ? "Kürzel" : "Stufe oder Kurs"
            }
          />
        </form>
        <div className="filterlist">
          {[filterValues.class, filterValues.key, ...filterValues.courses].map(
            (value) =>
              value && (
                <div key={value} className="row">
                  <FaTag className="btnIcon" />
                  <p className="">{value}</p>
                  <FaTrash
                    onClick={() => removeFilter(value)}
                    className="btnIcon"
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
