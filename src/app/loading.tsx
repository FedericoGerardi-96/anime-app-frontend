import style from '../styles/loading.module.css';

export default function Loading() {
  return (
    <div className={`${style.container}`}>
      <div className={`${style.blur}`}/>
      <div className={`${style.loader}`}></div>
    </div>
  );
}
