import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import * as Layouts from "./layouts";

const AGENT_LAYOUTS: Record<
  string,
  Record<string, React.ComponentType>
> = {
  "1": {
    "1": Layouts.Agent1.Layout01,
    "2": Layouts.Agent1.Layout02,
    "3": Layouts.Agent1.Layout03,
    "4": Layouts.Agent1.Layout04,
  },
  "2": {
    "1": Layouts.Agent2.Layout01,
    "2": Layouts.Agent2.Layout02,
    "3": Layouts.Agent2.Layout03,
    "4": Layouts.Agent2.Layout04,
  },
  "3": {
    "1": Layouts.Agent3.Layout01,
    "2": Layouts.Agent3.Layout02,
    "3": Layouts.Agent3.Layout03,
    "4": Layouts.Agent3.Layout04,
  },
  "4": {
    "1": Layouts.Agent4.Layout01,
    "2": Layouts.Agent4.Layout02,
    "3": Layouts.Agent4.Layout03,
    "4": Layouts.Agent4.Layout04,
  },
  "5": {
    "1": Layouts.Agent5.Layout01,
    "2": Layouts.Agent5.Layout02,
    "3": Layouts.Agent5.Layout03,
    "4": Layouts.Agent5.Layout04,
    "5": Layouts.Agent5.Layout05,
  },
};

function LayoutView() {
  const { agentId, layoutId } = useParams<{
    agentId: string;
    layoutId: string;
  }>();

  if (!agentId || !layoutId) return null;

  const agentLayouts = AGENT_LAYOUTS[agentId];
  const LayoutComponent = agentLayouts?.[layoutId];

  if (!LayoutComponent) {
    return (
      <div>
        <p>Nie znaleziono layoutu: Agent {agentId}, Layout {layoutId}</p>
        <Link to="/">← Powrót</Link>
      </div>
    );
  }

  return (
    <div>
      <nav style={{ padding: "1rem", background: "#f0f0f0", marginBottom: "1rem" }}>
        <Link to="/">← Powrót do listy</Link>
        <span style={{ margin: "0 1rem" }}>|</span>
        <span>Agent {agentId} / Layout {layoutId}</span>
      </nav>
      <LayoutComponent />
    </div>
  );
}

function Home() {
  return (
    <div style={{ padding: "2rem", maxWidth: 800 }}>
      <h1>CarMentor Layouts</h1>
      <p>Wybierz agenta i layout do podglądu:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(AGENT_LAYOUTS).map(([agentId, layouts]) => (
          <li key={agentId} style={{ marginBottom: "1.5rem" }}>
            <strong>Agent {agentId}</strong>
            <ul style={{ listStyle: "none", paddingLeft: "1rem", marginTop: "0.5rem" }}>
              {Object.keys(layouts).map((layoutId) => (
                <li key={layoutId} style={{ marginBottom: "0.25rem" }}>
                  <Link to={`/agent/${agentId}/layout/${layoutId}`}>
                    Layout {layoutId}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agent/:agentId/layout/:layoutId" element={<LayoutView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
