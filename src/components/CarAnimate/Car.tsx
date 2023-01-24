/* eslint-disable @next/next/no-img-element */
export default function Car(props: { started: boolean; className?: string }) {
  const { className, started } = props;
  return (
    <div className={`car ${className ? className : ""} ${started ? "car-move" : ""}`}>
      <img src="/img/taxi-blank.png" className="taxi" alt="" />
      <img src="/img/dachtaxi.png" className="taxi-light" alt="" />
      <img src="/img/reifenvoll.png" className="wheel-r wheel-spin" alt="" />
      <img src="/img/reifenvoll.png" className="wheel-l wheel-spin" alt="" />
      <img src="/img/reifen-hinten.png" className="wheel-c wheel-spin" alt="" />
      <img src="/img/taxi-fever.png" className="taxi-fever fever-anim" alt="" />
    </div>
  );
}
