import React, { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { AppContext } from "../context/AppProvider";

interface settingsProps {}

export const Settings: React.FC<settingsProps> = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AppContext);
  return (
    <>
      <Header
        title="Settings"
        left={{
          link: "/",
          icon: <FaChevronLeft className="btnIcon" />,
        }}
      />
      <div className="container">
        <div className="settings">
          {user &&
            Object.entries(user).map(
              ([setting, value]: [string, string | boolean]) => (
                <div key={setting} className="setting">
                  <h1>{setting}</h1>
                  <div>
                    {typeof value === "string" ? (
                      <p>{value}</p>
                    ) : (
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={!!value}
                          onChange={(e) => {
                            const updatedUser: any = {};
                            updatedUser[setting] = !(user as any)[setting];
                            dispatch({
                              type: "UPDATE_USER",
                              payload: { ...user, ...updatedUser },
                            });
                          }}
                        />
                        <span className="slider round"></span>
                      </label>
                    )}
                  </div>
                </div>
              )
            )}

          <div style={{ marginTop: "auto" }} className="setting">
            <h1>Logout</h1>
            <div>
              <FaChevronRight
                onClick={() =>
                  dispatch({
                    type: "UPDATE_USER",
                    payload: null,
                  })
                }
                className="btnIcon"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
