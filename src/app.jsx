import { createStore, reconcile } from "solid-js/store";
import { render } from "solid-js/web";

const App = () => {
  const [state, setState] = createStore({ databases: [] }),
    load = () => {
      Monitoring.renderRate.ping();
      const value = ENV.generateData().toArray();
      // Cheat like top libraries
      Promise.resolve(value).then(v =>
        setState("databases", reconcile(v, { merge: true, key: null }))
      );
      setTimeout(load, ENV.timeout);
    };
  setTimeout(load, 0);

  return (
    <table class="table table-striped latest-data">
      <tbody>
        <For each={state.databases}>
          {db => {
            const dbName = db.dbname;
            return (
              <tr>
                <td class="dbname" textContent={dbName} />
                <td class="query-count">
                  <span
                    class={db.lastSample.countClassName}
                    textContent={db.lastSample.nbQueries}
                  />
                </td>
                <For each={db.lastSample.topFiveQueries}>
                  {query => (
                    <td class={query.elapsedClassName}>
                      {query.formatElapsed}
                      <div class="popover left">
                        <div
                          class="popover-content"
                          textContent={query.query}
                        />
                        <div class="arrow" />
                      </div>
                    </td>
                  )}
                </For>
              </tr>
            );
          }}
        </For>
      </tbody>
    </table>
  );
};

render(App, document.getElementById("dbmon"));
