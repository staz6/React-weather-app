import React, { useEffect } from "react";
import { BiBell } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { useWeatherContext } from "../../Context/WeatherContext";
import Button from "../Shared/Button";
import WeatherAlertHook from "../../CustomeHooks/WeatherAlertHook";

const WeatherAlert: React.FC = () => {
  const { searchCity } = useWeatherContext();

  const { isError, data } = WeatherAlertHook({ searchCity });
  useEffect(() => {
    if (data && data.alerts && data.alerts.alert.length > 0) {
      data.alerts.alert.forEach((alert) => {
        toast(
          (t) => (
            <div>
              <div className="flex justify-end">
                <Button
                  onClick={() => toast.dismiss(t.id)}
                  className=""
                  icon={<RxCross2 size={22} />}
                  description=""
                />
              </div>
              <h2 className="text-2xl">{alert.headline}</h2>
              <h1 className="text-red-500 my-1">{alert.category} !</h1>
              <p className="text-sm">
                {alert.desc
                  .trim()
                  .split("*")
                  .map((line, i) => (
                    <p key={i} className="text-sm mb-1">
                      {line.trim()}
                    </p>
                  ))}
              </p>
            </div>
          ),
          {
            duration: 5000,
          },
        );
      });
    }
  }, [data]);

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  const alerts = data?.alerts?.alert || [];

  const handleBellClick = (): void => {
    if (alerts.length === 0) {
      toast.error("No notifications", {
        duration: 4000,
      });
    } else {
      toast(
        (t) => (
          <div>
            <div className="flex justify-end">
              <Button
                onClick={() => toast.dismiss(t.id)}
                className=""
                icon={<RxCross2 size={24} />}
                description=""
              />
            </div>
            {alerts.map((e, index) => (
              <div key={index} className=" bg-gray-200 p-2 mt-1 rounded-md">
                <h2 className="text-2xl">{e.headline}</h2>
                <h1 className="text-red-500 my-1">{e.category} !</h1>
                <p className="text-sm">
                  {e.desc
                    .trim()
                    .split("*")
                    .map((line, i) => (
                      <p key={i} className="text-sm mb-1">
                        {line.trim()}
                      </p>
                    ))}
                </p>
              </div>
            ))}
          </div>
        ),
        { duration: Infinity },
      );
    }
  };

  return (
    <div>
      <Toaster />
      <Button
        className=""
        description=""
        onClick={handleBellClick}
        icon={<BiBell color="white" size={26} />}
      />
    </div>
  );
};

export default WeatherAlert;
