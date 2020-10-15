import React, { useContext, useState } from "react";
import { FaTag, FaTrash } from "react-icons/fa";
import { AppContext } from "../context/AppProvider";
import { FilterValues } from "../interfaces/FilterValues";
import { User } from "../interfaces/User";

interface FilterProps {
  toggle: () => void;
}

export const Filter: React.FC<FilterProps> = ({ toggle }) => {
  const {
    state: { user, filterValues },
    dispatch,
  } = useContext(AppContext);
  const [filter, setFilter] = useState<string>("");
  const [cache] = useState<FilterValues>(filterValues);

  const parseInput = () => {
    if (filter.length > 0) {
      if (isNaN(filter[0] as any)) {
        if (!filterValues.courses.includes(filter))
          dispatch({ type: "ADD_COURSE", payload: filter });
      } else {
        dispatch({ type: "ADD_CLASS", payload: filter });
      }
      setFilter("");
    } else {
      toggle();
    }
  };

  const removeFilter = (value: string) => {
    console.log(filterValues.class === value);
    if (filterValues.class === value || filterValues.key === value)
      dispatch({ type: "REMOVE_CLASS_OR_KEY", payload: value });
    else {
      dispatch({ type: "REMOVE_COURSE", payload: value });
    }
  };

  return (
    <div className="filter">
      <div className="filterContent ">
        <div className="menu">
          <p
            onClick={() => {
              dispatch({ type: "LOAD_CACHE", payload: cache });
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
              (user as User).username.includes("mpg")
                ? "Kürzel"
                : "Stufe oder Kurs"
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
