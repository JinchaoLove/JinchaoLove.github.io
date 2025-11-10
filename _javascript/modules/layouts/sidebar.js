import { modeWatcher } from '../components/mode-watcher';
import { sidebarExpand } from '../components/sidebar';
import { navToggle } from '../components/nav-toggle';

export function initSidebar() {
  modeWatcher();
  sidebarExpand();
  navToggle();
}
