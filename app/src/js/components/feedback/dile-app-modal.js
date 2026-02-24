import { DileAppModalFeedback} from "@dile/lib";
import { store } from "../../redux/store.js";

customElements.define('dile-app-modal', DileAppModalFeedback(store));