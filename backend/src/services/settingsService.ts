import { store } from "../models/store";
import { InstituteSettings } from "../models/types";

export class SettingsService {
  static getSettings(): InstituteSettings {
    return store.getSettings();
  }

  static updateSettings(updates: Partial<InstituteSettings>): InstituteSettings {
    return store.updateSettings(updates);
  }
}
