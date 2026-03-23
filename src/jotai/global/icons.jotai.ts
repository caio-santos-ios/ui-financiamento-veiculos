import * as Ai from "react-icons/ai";
import * as Bi from "react-icons/bi";
import * as Bs from "react-icons/bs";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Fi from "react-icons/fi";
import * as Go from "react-icons/go";
import * as Hi from "react-icons/hi";
import * as Hi2 from "react-icons/hi2";
import * as Io from "react-icons/io";
import * as Io5 from "react-icons/io5";
import * as Lu from "react-icons/lu";
import * as Md from "react-icons/md";
import * as Pi from "react-icons/pi";
import * as Ri from "react-icons/ri";
import * as Tb from "react-icons/tb";
import * as Ti from "react-icons/ti";
import { atom } from "jotai";

const iconsMap: any = {
  ...Ai, ...Bi, ...Bs, ...Fa, ...Fa6,
  ...Fi, ...Go, ...Hi, ...Hi2, ...Io,
  ...Io5, ...Lu, ...Md, ...Pi, ...Ri,
  ...Tb, ...Ti,
};

export const iconAtom = atom<any>(iconsMap);
