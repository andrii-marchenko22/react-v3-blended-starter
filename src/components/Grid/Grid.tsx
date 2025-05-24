import style from "./Grid.module.css";

interface CrideProps {
  children: React.ReactNode;
}

export default function Grid({ children }: CrideProps) {
  return <ul className={style.list}>{children}</ul>;
}
