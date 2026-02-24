import { DileAppFeedback } from "@dile/lib";
import { store } from "../../redux/store.js";

customElements.define('dile-app-toast', DileAppFeedback(store));