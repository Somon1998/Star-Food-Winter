import "./styles/main.scss";
import "swiper/css/bundle";
import { setLanguage } from "../lang/langs.js";
import { bootstrap } from "./app/bootstrap.js";
import { initSeasonSystem } from "./snow/snow.js";
import { initTreeSeasonSystem } from "./christmas-tree/christmas-tree.js";

// Ёлка отображаются только зимой при загрузке и проверяют сезон каждые час
initTreeSeasonSystem();

// Снег отображается только зимой при загрузке и проверяет сезон каждые час
initSeasonSystem();

bootstrap();

{
  setLanguage;
}
