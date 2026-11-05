// App.jsx
// Root component. Initializes Parse before rendering the router/components tree.

import "@/Shared/parseConfig.jsx";

import Components from "./Shared/Components/Components.jsx";

export default function App() {
  return <Components />;
}