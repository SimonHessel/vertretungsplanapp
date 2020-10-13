import React, { useEffect, useState } from "react";
import { jsonDateParser } from "json-date-parser";
import { FaCog, FaFilter } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

import { PlanComponent } from "../components/PlanComponent";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Filter } from "../components/Filter";

import { Plan } from "../interfaces/Plan";
import { FilterValues } from "../interfaces/FilterValues";
import { User } from "../interfaces/User";

import planData from "../data/example.json";

interface mainProps {
  user: User;
}

export const Main: React.FC<mainProps> = ({ user }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setPlans(JSON.parse(JSON.stringify(planData), jsonDateParser));
  }, []);

  const [filterActive, setFilterActive] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>(() => {
    const fetchedFilterValues = localStorage.getItem("filterValues");
    if (fetchedFilterValues) return JSON.parse(fetchedFilterValues);
    return { courses: [] };
  });

  useEffect(
    () => localStorage.setItem("filterValues", JSON.stringify(filterValues)),
    [filterValues]
  );
  const toggle = () => setFilterActive(!filterActive);
  return (
    <>
      <Header
        title="Vertretungsplan"
        left={{
          icon: (
            <FaFilter
              className="btnIcon"
              onClick={(e) => setFilterActive(!filterActive)}
            />
          ),
        }}
        right={{ icon: <FaCog className="btnIcon" />, link: "/settings" }}
      />
      <div className="container">
        {/* <svg
          id="reloading"
          width="24px"
          height="24px"
          className="hidden lds-rolling"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          style={{ background: "rgba(0, 0, 0, 0) none repeat scroll 0% 0%" }}
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            ng-attr-stroke="{{config.color}}"
            ng-attr-stroke-width="{{config.width}}"
            ng-attr-r="{{config.radius}}"
            ng-attr-stroke-dasharray="{{config.dasharray}}"
            stroke="#070707"
            strokeWidth="10"
            r="35"
            strokeDasharray="164.93361431346415 56.97787143782138"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              calcMode="linear"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </svg> */}

        <ul className={plans.length === 0 ? "empty" : ""}>
          {plans.map((plan: Plan, index: number) => (
            <PlanComponent
              filterValues={filterValues}
              key={plan.date.toISOString()}
              index={index}
              plan={plan}
            />
          ))}
        </ul>
      </div>
      <CSSTransition
        in={filterActive}
        classNames="filter"
        timeout={500}
        unmountOnExit
      >
        <Filter
          user={user}
          toggle={toggle}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />
      </CSSTransition>

      <Footer />
    </>
  );
};
