import "./styles/main.scss";
import "swiper/css/bundle";
import { setLanguage } from "../lang/langs.js";
import { bootstrap } from "./app/bootstrap.js";
import { initSeasonSystem } from "./snow/snow.js";

// Снег отображается только зимой при загрузке и проверяет сезон каждые час
initSeasonSystem();

bootstrap();

{
  setLanguage;
}
