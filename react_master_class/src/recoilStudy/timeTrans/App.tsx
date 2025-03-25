import { useRecoilState } from "recoil";
import { minutesAtom, minutesSelector } from "../recoil"; 

function App() {

  const [minutes, setMinutes] = useRecoilState(minutesAtom);
  const [hours, setHours] = useRecoilState(minutesSelector);

  const changeMinutesSetting = (e: React.ChangeEvent<HTMLInputElement>) => {

    const {
      currentTarget: {
        value
      }
    } = e;

    if (value === '') setMinutes('');
    else setMinutes(parseInt(value, 10));
  }

  const changeHoursSetting = (e: React.ChangeEvent<HTMLInputElement>) => {

    const {
      currentTarget: {
        value
      }
    } = e;

    if (value === '') setHours('');
    else setHours(parseInt(value, 10));
  }

  return (
    <>
      <input
        type="number"
        placeholder="hours"
        value={hours}
        onChange={changeHoursSetting}
      />
      <input
        type="number"
        placeholder="minutes"
        value={minutes}
        onChange={changeMinutesSetting}
      />
    </>
  );
}

export default App;