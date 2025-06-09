import {
  FaChartLine,
  FaFeatherAlt,
  FaListUl,
  FaFolderOpen,
  FaCogs,
  FaUser
} from "react-icons/fa";

const navLinks = [
  { icon: FaChartLine, label: "Dashboard", path: "/" },
  { icon: FaFeatherAlt, label: "Editor", path: "/editor" },
  { icon: FaListUl, label: "Analytics", path: "/analytics" },
  { icon: FaFolderOpen, label: "History", path: "/history" },
  { icon: FaListUl, label: "Templates", path: "/templates" },
  { icon: FaCogs, label: "Settings", path: "/settings" },
  { icon: FaUser, label: "Account", path: "/account" }
];

export default navLinks;
