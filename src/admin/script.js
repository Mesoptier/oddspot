const React = require('react');
const ReactDOM = require('react-dom');

const questionnaire = window.INITIAL_DATA.questionnaire;

var glb;

/* ===== FROM cache.js ===== */

// react to history events
// (state changes, e.g. loading a page)
window.addEventListener('onload', () => {});
window.addEventListener('popstate', () => {});

// react to localStorage updates
// (updates to the questionnaire)
window.addEventListener('storage', event => {
  if (["questionnaire", "admin"].contains(history.state.title)) {
    // push a notification, informing the client of the new info
    // ..
  } else {
    //
  }
});

// try to find a new version of the questionnaire upon load
applicationCache.addEventListener('updateready', event => {
  if (applicationCache.status == applicationCache.UPDATEREADY) {
    // browser downloaded new app cache
    applicationCache.swapCache();
  }
});




/* ===== FROM toolbelt.js ===== */

var hash = function(h) {
  var hash = 0, i, chr, len;
  if (h.length === 0) return hash;
  for (i = 0, len = h.length; i < len; i++) {
    chr   = h.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
var f = function(obj, path) {
  path = path.split(".");

  do obj = obj[path.shift()];
  while (path.length > 0)

  return obj;
}
var alike = function(a, b) {
  if (a === "0") a = 0;
  if (b === "0") b = 0;
  if (typeof a === "object" && typeof b === "object")
    return JSON.stringify(a) === JSON.stringify(b);
  return (
    (a == b) ||
    (!a && b == null) ||
    (a == null && !b)
  );
}
var log = function () {
  console.log(...arguments);
  return arguments[arguments.length - 1];
} // easy insert `return log( ... )`
var err = function () {
  console.error(...arguments);
  return arguments[arguments.length - 1];
} // east insert `return error( ... )`

var Strings = {
  capitalizeFirst: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  toTitleCase: function (string) {
    var sentence = string.split(/\s+/);

    for (var word in sentence) sentence[word] = Strings.capitalizeFirst(sentence[word]);

    return sentence.join(" ");
  },
  toCamelCase: function (string) {
    return Strings.toTitleCase(string).split(" ").join("")
  },
  toSentenceCase: function (string) {
    var paragraph = Strings.normalize(string).split(/\.\s+/);

    for (var sentence in paragraph) paragraph[sentence] = Strings.capitalizeFirst(paragraph[sentence]);

    return paragraph.join(". ");
  },
  normalize: function (string) {
    return string.split(/\s+/).join(" ");
  }
}
var Numbers = {
  match: {
    integer: /^[-+]?[0-9]+$/,
    float: /^[-+]?(?:[0-9]*\.)?[0-9]+$/
  },
  parse: {
    integer: function (int) {
      if (Numbers.match.integer.test(int)) {
        return parseInt(int);
      } return NaN;
    },
    float: function (float) {
      if (Numbers.match.float.test(float)) {
        return parseFloat(float);
      } return NaN;
    }
  }
}
var Arrays = {
  add: function (array, merge) {
    if (typeof merge != 'object') merge = [merge];

    for (var i in merge)
      if (merge.hasOwnProperty(i))
        if (array.indexOf(merge[i]) < 0)
          array = array.concat(merge);

    return array;
  },
  rem: function (array, remove) {
    if (typeof remove != 'object') remove = [remove];

    var i, index;
    for (i in remove)
      if (remove.hasOwnProperty(i))
        while ((index = array.indexOf(remove[i])) > -1)
          array.splice(index, 1);

    return array;
  },
  unique: function (array) {
    array = array.concat();
    for (var i = 0; i < array.length; i++)
      for (var j = i+1; j < array.length; j++ )
        if (array[i] === array[j])
          array.splice(j--, 1);
    return array;
  }
}
var Objects = {
  merge: function (base, add) {
    return Object.assign(...arguments);
  },
  clone: function (obj) {
    return Object.assign({}, obj);
  },
  intersect: function (obj, mask) {
    var result = {},
      mask = {
        Object: m => {
          return Object.keys(m);
        },
        String: m => {
          return m.split(/, ?/);
        },
        Array: m => {
          return m;
        }
      }[mask.constructor.name](mask);

    for (var key in obj)
      if (mask.indexOf(key) >= 0)
        result[key] = obj[key];

    return result;
  },
  subtract: function (obj, mask) {
    var result = {},
      mask = {
        Object: m => {
          return Object.keys(m);
        },
        String: m => {
          return m.split(/, ?/);
        },
        Array: m => {
          return m;
        }
      }[mask.constructor.name](mask);

    for (var key in obj)
      if (mask.indexOf(key) === -1)
        result[key] = obj[key];

    return result;
  },
  buildTree: function (path, data) {
    var obj = {},
      o = obj,
      i = 0,
      n = path.split(".");
    for (; i < n.length - 1; i++) {
      o[n[i]] = {};
      o = o[n[i]];
    }
    o[n[i]] = data;
    return obj;
  },
  cleanEmpty: function (tree) {
    for (var i in tree) {
      if (tree[i] && Objects.isPopulated(tree[i]))
        Objects.cleanEmpty(tree[i]);

      if (tree[i] === undefined || Objects.isEmpty(tree[i]))
        delete tree[i];
    }
    return tree;
  },
  isPopulated: function (obj) {
    return Objects.isObject(obj) && Object.keys(obj).length > 0
  },
  isEmpty: function (obj) {
    return Objects.isObject(obj) && Object.keys(obj).length === 0
  },
  isEnumerated: function (obj) {
    if (Objects.isEmpty(obj))
      return true;
    if (Objects.isPopulated(obj)) {
      for (var i in obj)
        if (!Numbers.match.integer.test(i))
          return false;
      return true;
    } else
      return false;
  },
  isObject: function (obj) {
    return obj !== null && typeof obj === 'object' && obj.constructor === Object
  }
}
var Elements = {
  hasClass: function(elem, classname) {
    return elem !== null && "className" in elem
      ? elem.className.split(" ").indexOf(classname) >= 0
      : false;
  },
  getParent: function(elem, classname) {
    while (elem !== null && "parentNode" in elem && !Elements.hasClass(elem, classname))
      elem = elem.parentNode;
    return elem;
  }
}
// POLYFILL
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}





/* ===== FROM language.js ===== */

var log_errors = true;
var languages = {
  en: {
    display: true,
    fallback: []
  },
  nl: {
    display: true,
    fallback: ["en"]
  },
  de: {
    display: false,
    fallback: ["en"]
  }
}
var language = Object.keys(languages)[0]; // current language used, default = 0;
var dictionary = {
  edit: {
    questionnaire: {
      en: "edit questionnaire",
      nl: "vragenlijst aanpassen" // questionaire aanpassen ?
    }
  },
  constants: {
    en: "constants",
    nl: "constanten"
  },
  weight: {
    en: "weight",
    nl: "gewicht"
  },
  question: {
    en: "question",
    nl: "vraag",

    type: {
      en: "question type",
      nl: "vraagsoort"
    },
    types: {
      multiple_choice: {
        en: "multiple choice",
        nl: "meerkeuze"
      },
      integer: {
        en: "integer",
        nl: "geheel getal"
      },
      message: {
        en: "message",
        nl: "mededeling"
      }
    }
  },
  integer: {
    min: {
      en: "min",
      nl: "min"
    },
    max: {
      en: "max",
      nl: "max"
    },
    heuristic: {
      en: "heuristic function (over x)",
      nl: "heuristische functie (over x)"
    }
  },
  description: {
    en: "description",
    nl: "bescrijving"
  },
  label: {
    en: "label",
    nl: "label"
  },
  delete: {
    answer: {
      en: "delete",
      nl: "verwijderen"
    },
    question: {
      en: "delete question",
      nl: "vraag verwijderen"
    },
  },
  add: {
    answer: {
      en: "add answer",
      nl: "antwoord toevoegen"
    },
    question: {
      en: "add question",
      nl: "vraag toevoegen"
    },
  },
  deleted: {
    answer: {
      en: "you deleted an answer",
      nl: "u heeft een antwoord verwijderd"
    },
    question: {
      en: "you deleted a question",
      nl: "u heeft een vraag verwijderd"
    },
  },
  undo: {
    en: "undo",
    nl: "ongedaan maken"
  },
  dismiss: {
    en: "dismiss",
    nl: "negeren"
  },
  drag: {
    answers: {
      en: "drag answers around to re-organise them",
      nl: "versleep antwoorden om deze te sorteren"
    },
    questions: {
      en: "drag questions around to re-organise them",
      nl: "versleep vragen om deze te sorteren",
    }
  },
  save: {
    en: "save changes",
    nl: "wijzigingen opslaan",

    progress: {
      en: "saving...",
      nl: "aan het opslaan..."
    },
    success: {
      en: "saved successfully",
      nl: "succesvol opgeslagen"
    },
    error: {
      en: "error while saving",
      nl: "een fout is opgetreden tijdens het opslaan"
    },
    canceled: {
      en: "saving canceled",
      nl: "opslaan geannuleerd"
    }
  }

}

function l(path) {
  // return error if currently set language is not present in var languages
  if (!language in languages) {
    if (log_errors) console.error("No language '"+language+"' in languages");
    return "<error>";
  }

  // find appropriate node
  var node = dictionary;
  var next = path.split(" ");
  while (node && next.length)
    node = node[next.shift()];

  // retrieve language insert if any
  if (node && language in node)
    return node[language];

  // fallback on languages in order if possible
  for (var ln of languages[language].fallback) if (node && ln in node) {
    if (log_errors) console.warn("Could not find '"+path+"' in the '"+language+"' dictionary, falling back to '"+ln+"'");
    return node[ln];
  }

  // log an error otherwise
  if (log_errors) console.error("Could not find '"+path+"' in the '"+language+"' dictionary, could not fall back");
  return "<error>";
}





/* ===== FROM index.html ===== */

var Questionnaire = React.createClass({
  getInitialState: function () {
    return {
      changes: {}
    };
  },
  saveQuestionnaire: function () {
    var datastring = JSON.stringify(this.state.changes);
    var url = window.API_BASE_URL + "/questionnaire/save";

    Popup.set(l("save progress"), undefined, "wait");

    // TODO: XML request?
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      Popup.set(l("save success"), {showFor: 4000});
    });
    xhr.addEventListener("error", () => {
      Popup.set(l("save error"), {showFor: 4000});
    });
    xhr.addEventListener("abort", () => {
      Popup.set(l("save cancel"), {showFor: 4000});
    });

    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(datastring);
  },
  permeateChanges: function (id, data) {
    var s = this.state;
    var p = this.props;

    s.changes = Objects.cleanEmpty(
      Object.assign(
        s.changes,
        {[id]: data}));

    glb = s; // ..
    this.setState(s);
  },
  switchLanguage: function (e) {
    var newlan = e.target.innerText.toLowerCase();
    if (newlan in languages) language = newlan;
    this.forceUpdate();
  },
  render: function () {
    var t = this,
      q = t.props.questionnaire;

    return (
      <div>
        <div id="header">
          <h1>{Strings.toTitleCase(l("edit questionnaire"))}</h1>
          <div className="right">
            {Object.keys(languages).map(lang => {
              if (languages[lang].display)
                return (<a key={lang} onClick={t.switchLanguage}>{lang.toUpperCase()}</a>)})}
            <input type="button" className="inline" value={l("save")} onClick={this.saveQuestionnaire}/>
          </div>
        </div>
        <section name="questionnaire">
          <List name="constants"
                data={q.constants}
                monitor={this.permeateChanges} />

          <List name="questions"
                data={q.questions}
                monitor={this.permeateChanges} />
        </section>
      </div>
    );
  }
});
var Question = React.createClass({ // Seems to work okay ?
  getInitialState: function () {
    var q = this.props.question;
    var s =  {
      changes: {},
      toggled: false
    };
    return s;
  },
  permeateChanges: function (id, data) {
    var s = this.state,
      p = this.props,
      q = p.question,
      n = p.name;

    if (["AK", "BCC"].indexOf(id) >= 0) {
      // change in weights
      data = data.error || !data.change
        ? undefined
        : data.value;

      s.changes.weight = s.changes.weight || {};
      Object.assign(s.changes.weight, {[id]: data});
    }

    // change in question details
    if (["question", "description", "type"].indexOf(id) >= 0)
      data = data.error || !data.change
        ? undefined
        : data.value;

    var type = (id === "type" && data) || s.changes.type || q.type;
    if (id === "answers") { // only one type is updated at a time
      [data, id] = [{
        "multiple choice": Objects.subtract(data, "settings"),
        "integer": Objects.intersect(data, "settings"),
        "message": {}
      }[type], {
        "multiple choice": "choices",
        "integer": "settings",
        "message": ""
      }[type]];
    }

    s.changes = Objects.cleanEmpty(
      Object.assign(
        s.changes,
        {[id]: data}));

    this.setState(s);

    // filter appropriate data from state, according to type
    p.monitor(n, this.filteredChanges(type));
  },
  filteredChanges: function (t) {
    var c = this.state.changes,
      s = Objects.subtract;
    return {
      "multiple choice": s(c, "settings"),
      "integer": s(c, "choices"),
      "message": s(c, "choices, settings")
    }[t];
  },
  toggle: function () {
    this.setState({toggled: !this.state.toggled})
  },
  deleteThis: function () {
    var isPendingDeletion =
      "deleted" in this.state.changes &&
      this.state.changes.deleted === "pending"

    if (isPendingDeletion) {
      this.permeateChanges("deleted", "deleted");
    } else {
      Popup.set(
        Strings.capitalizeFirst(l("deleted question")),
        {
          showFor: 12000,
          actionables: [
            {label:l("undo"), fnc: this.undoDelete},
            {label:l("dismiss"), fnc: this.deleteThis}
          ],
          onTimeout: this.deleteThis,
          onOverride: this.deleteThis
        }
      );
      this.permeateChanges("deleted", "pending");
    }
  },
  undoDelete: function () {
    this.permeateChanges("deleted", false);
  },
  render: function () {
    var t = this,
      s = t.state,
      p = t.props,
      q = p.question,
      type = (s.changes.type || q.type),
      c = t.filteredChanges(type);

    return (
      <article className={["question question-" + type.replace(" ","-")].concat(p.className).join(" ")}
               draggable={p.draggable} onDragStart={p.onDragStart} onDragEnd={p.onDragEnd}
               name={p.name} data-id={p.name}>

        <label className={"header" + (s.toggled ? "" : " hideAllBelow")}>
          <input hidden type="checkbox"
                 value={s.toggled}
                 onChange={t.toggle} />
          <h2>{ type === "message"
            ? ("description" in c ? c.description : q.description)
            : ("question" in c ? c.question : q.question) }</h2>
          <h3>{ type === "message"
            ? null
            : ("description" in c ? c.description : q.description) }</h3>
        </label>

        <div className="container">
          <label className="smartInput">
            <p>{Strings.capitalizeFirst(l("question type"))}</p>
            <select defaultValue={q.type} onChange={e => {
                                        var v = e.target.value;
                                        t.permeateChanges("type", {
                                            change: !alike(q.type, v),
                                            value: v});
                                        t.setState({type: v});
                                    }}>
              <option value="multiple choice">{Strings.capitalizeFirst(l("question types multiple_choice"))}</option>
              <option value="integer">{Strings.capitalizeFirst(l("question types integer"))}</option>
              <option value="message">{Strings.capitalizeFirst(l("question types message"))}</option>
            </select>
          </label>

          {"weights" in q && Object.keys(q.weights).map(type =>
            <Input key={type}
                   name={type}
                   type="float"
                   label={Strings.capitalizeFirst(l("weight")) + " " + type}
                   classnames="small inline"
                   value={q.weights[type]}
                   monitor={t.permeateChanges} />)}

          { type === "message" ? "" :
            <Input key="question"
                   name="question"
                   type="string"
                   label={Strings.capitalizeFirst(l("question"))}
                   className="full"
                   value={q.question}
                   settings={{min: 1}}
                   monitor={t.permeateChanges} /> }

          <Input key="description"
                 name="description"
                 type="string"
                 label={Strings.capitalizeFirst(l("description"))}
                 className="full"
                 value={q.description}
                 monitor={t.permeateChanges} />

          <input type="button" value={l("delete question")}
                 onClick={t.deleteThis} />

          { type === "message" ? "" : <hr /> }

          <List name="answers"
                data={{
                                        "multiple choice": {
                                            type: "multiple choice",
                                            choices: q.choices || {}
                                        },
                                        "message": {
                                            type: "message"
                                        },
                                        "integer": {
                                            type: "integer",
                                            settings: q.settings || {
                                                min: 0,
                                                max: 100,
                                                fnc: "sqrt(x)"
                                            }
                                        }
                                    }[type]}
                monitor={t.permeateChanges} />

        </div>
      </article>
    );
  }
});
var Answer = React.createClass({
  getInitialState: function () {
    return {
      changes: {}
    };
  },
  permeateChanges: function (id, data) {
    var s = this.state,
      p = this.props,
      n = p.name;

    if (id === "deleted" && data === false)
      data = undefined;

    if (typeof data === "object")
      data = data.error || !data.change
        ? undefined
        : data.value;

    Object.assign(s.changes, {[id]: data});
    s.changes = Objects.cleanEmpty(s.changes);

    this.setState(s);
    this.props.monitor(n, s.changes);
  },
  deleteThis: function () {
    var isPendingDeletion =
      "deleted" in this.state.changes &&
      this.state.changes.deleted === "pending"

    if (isPendingDeletion) {
      this.permeateChanges("deleted", "deleted");
    } else {
      Popup.set(
        Strings.capitalizeFirst(l("deleted answer")),
        {
          showFor: 12000,
          actionables: [
            {label:l("undo"), fnc: this.undoDelete},
            {label:l("dismiss"), fnc: this.deleteThis}
          ],
          onTimeout: this.deleteThis,
          onOverride: this.deleteThis
        }
      );
      this.permeateChanges("deleted", "pending");
    }
  },
  undoDelete: function () {
    this.permeateChanges("deleted", false);
  },
  render: function () {
    var t = this,
      p = t.props,
      c = p.choice || p.settings,
      h = Object.assign({}, c, t.state.changes);

    switch (p.type) {
      case 'multiple choice':
        return (
          <div className={["answer answer-multiple-choice"].concat(p.className).join(" ")}
               draggable={p.draggable} onDragStart={p.onDragStart} onDragEnd={p.onDragEnd}
               name={p.name} data-id={p.name}>

            <Input key="weight"
                   name="value"
                   type="float"
                   label={Strings.capitalizeFirst(l("weight"))}
                   className="small"
                   value={c.value}
                   monitor={this.permeateChanges} />
            <Input key="label"
                   name="label"
                   type="string"
                   label={Strings.capitalizeFirst(l("label"))}
                   className="large"
                   value={c.label}
                   monitor={this.permeateChanges} />
            <input type="button" value={l("delete answer")}
                   onClick={this.deleteThis} />
          </div>
        )
      case 'integer':
        return (
          <div class="answer answer-integer">
            <Input key="min"
                   name="min"
                   type="integer"
                   label={Strings.capitalizeFirst(l("integer min"))}
                   value={c.min}
                   settings={{max: h.max}}
                   monitor={this.permeateChanges} />
            <Input key="max"
                   name="max"
                   type="integer"
                   label={Strings.capitalizeFirst(l("integer max"))}
                   value={c.max}
                   settings={{min: h.min}}
                   monitor={this.permeateChanges} />
            <Input key="fnc"
                   name="fnc"
                   type="string"
                   className="full"
                   label={Strings.capitalizeFirst(l("integer heuristic"))}
                   value={c.fnc}
                   monitor={this.permeateChanges}/>
          </div>
        )
      default: return "";
    }
  }
})
var List = React.createClass({
  getInitialState: function () {
    // set placeholder
    this.placeholder = document.createElement("div");
    this.placeholder.className = "orderable placeholder";

    // define initial state
    var s = {
      changes: {},
      dragging: false
    };
    var p = this.props;

    return s;
  },
  permeateChanges: function (id, data) {
    var s = this.state,
      p = this.props,
      n = p.name;

    if (id === "order") {
      var c = s.changes;

      var keys = Object.keys(data);
      for (var key of keys) {
        c[key] = (c[key] || {});
        c[key].order = data[key].order;
      }

      this.setState({changes: c});
      p.monitor(n, c);
      return;
    }

    if (n === "constants")
      data = data.error || !data.change
        ? undefined
        : data.value;

    if (s.changes[id] && s.changes[id].order && !data.order)
      data.order = s.changes[id].order;

    if (data !== undefined && data.deleted === "deleted") {
      // if deleted, move item to back of list before deletion
      var d = p.data
      c = s.changes;

      // no good merge, good enough
      var old = (d.choices || d);
      var keys = Object.keys(Object.assign({}, old, c));
      if (keys.indexOf("settings") >= 0)
        keys.splice(keys.indexOf("settings"), 1);

      var cur = {};
      for (var key of keys)
        cur[key] = key in c && "order" in c[key] ? c[key].order : old[key].order;

      var order = cur[id];
      var c = {};
      for (var key of keys)
        if (cur[key] > order) c[key] = cur[key] - 1;
      delete c[id];

      this.permeateChanges("order", c);
    }

    if (id[0] === "n") {
      if (id in s.changes) {
        var order = s.changes[id].order;
        s.changes[id] = Object.assign({},
          this.addableItems[p.data.type || p.name],
          data);
        s.changes[id].order = order;
      } else s.changes[id] = data;

      if (data !== undefined && data.deleted === "deleted")
        delete s.changes[id];
    } else s.changes[id] = data;

    s.changes = Objects.cleanEmpty(s.changes);

    this.setState(s);
    if (id === "settings") {
      p.monitor(id, s.changes[id])
    } else {
      p.monitor(n, s.changes);
    }
  },
  addItem: function () {
    var s = this.state,
      p = this.props,
      c = s.changes,
      d = p.data;

    var add = Objects.clone(this.addableItems[p.data.type || p.name]);

    // order as last
    var combined = Objects.subtract(Object.assign({}, c,
      (d.choices || d)), "settings");

    for (var i in combined)
      if (combined[i].order >= add.order)
        add.order = combined[i].order + 1;

    // find the approprate n-index to create
    var idx = 0;
    while (c["n" + idx] !== undefined) idx++;
    idx = "n" + idx;

    // permeate changes
    this.permeateChanges(idx, add);
  },
  addableItems: {
    "multiple choice": {order: 1, value: 1, label: "New Choice"},
    "questions" : {order: 1, question: "", description: "New Question", type: "message", weights: {}, choices: {}}
  },
  dragEnd: function (e) {
    e.stopPropagation();

    this.drag.object.style.display = null;
    this.drag.parent.removeChild(this.placeholder);

    var s = this.state,
      p = this.props,
      c = s.changes,
      d = p.data,
      n = p.name;

    var old = (d.choices || d),
      keys = Object.keys(Object.assign({}, old, c)),
      cur = {};

    for (var key of keys)
      cur[key] = key in c && "order" in c[key]
        ? c[key].order
        : old[key].order;

    var id_dragged = this.drag.object.dataset.id,
      p_from = cur[id_dragged],
      p_to = (this.drag.before === null
            ? Object.keys(cur).length
            : cur[this.drag.before.dataset.id]
        ) - 1,
      high = Math.max(p_from, p_to),
      low = Math.min(p_from, p_to);

    var add = p_from > p_to ? 1 : 0;

    for (var id in cur)
      if (high >= cur[id] && cur[id] >= low + add)
        c[id] = c[id] || {order: NaN},
          c[id].order = cur[id] + (p_from > p_to ? +1 : -1);

    c[id_dragged].order = p_to + add;
    this.permeateChanges("order", c);

    this.setState({dragging: false});

    // remove this.drag
    delete this.drag;
  },
  dragOver: function (e) {
    if (typeof this.drag !== "undefined") {
      e.preventDefault();
      e.stopPropagation();

      if (!this.state.dragging)
        this.setState({dragging: true});
      this.drag.object.style.display = "none";

      var target = e.target;

      var correctList = target !== null &&
        this.drag.parent.contains(target) &&
        this.drag.parent === Elements.getParent(target, "draggable-wrapper");

      if (correctList) {
        target = Elements.getParent(target, "orderable");

        if (Elements.hasClass(target, "placeholder"))
          target = target.nextElementSibling;

        if (target !== null) {
          var relY = e.clientY - target.getBoundingClientRect().top;
          var midY = {
            "questions":   target.offsetHeight / 2,
            "answers": 2 * target.offsetHeight / 3
          }[this.drag.parent.parentNode.className];

          if (relY > midY) {
            target = target.nextElementSibling;
            if (Elements.hasClass(target, "placeholder"))
              target = target.nextElementSibling;
          }
        }

        if (this.drag.before !== target) {
          this.drag.before = target;
          this.drag.parent.insertBefore(this.placeholder, target);
        }
      }
    }
  },
  dragStart: function (e) {
    e.stopPropagation();

    // defining this.drag
    var b = undefined,
      o = e.currentTarget,
      p = Elements.getParent(o, "draggable-wrapper");

    this.drag = {
      object: o, // the object being dragged
      parent: p, // the parent of object
      before: b, // before which object should be placed
    }

    var h = o.querySelector(".header");
    this.placeholder.style.height = (h || o).offsetHeight + 4 + "px";

    // setting the datatransfer
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", o);
  },
  render: function () {
    var t = this,
      s = t.state,
      p = t.props,
      d = p.data,
      n = p.name,
      c = s.changes;

    return {
      "constants": function(){return(
        <div className="constants">
          <h2>{Strings.capitalizeFirst(l("constants"))}</h2>
          {Object.keys(d).map(type =>
            <Input key={type}
                   name={type}
                   type="float"
                   label={Strings.capitalizeFirst(l("weight")) + " " + type}
                   classnames="small inline"
                   value={d[type]}
                   monitor={t.permeateChanges} />)}
        </div>
      )},
      "questions": function(){return(
        <div className="questions">
          <p>{l("drag questions")}</p>
          { t.state.dragging ? <input hidden type="checkbox" checked readOnly className="forceHide"/> : null }
          <div className="draggable-wrapper" onDragOver={t.dragOver}>
            {Object.keys(Object.assign({}, d, c)).sort(
              (a, b) => {
                return (
                  Object.assign({}, d[a], c[a]).order -
                  Object.assign({}, d[b], c[b]).order
                )
              }
            ).map(q => {
              if (q in c && c[q].deleted === "deleted") return null;
              return (
                <Question
                  key={q}
                  name={q}
                  draggable="true"
                  onDragEnd={t.dragEnd}
                  onDragStart={t.dragStart}
                  question={q[0] === "n"
                                                    ? t.addableItems[n]
                                                    : d[q]}
                  className={"orderable" + (c[q] && c[q].deleted === "pending" ? " deleted" : "")}
                  monitor={t.permeateChanges} />)})}
          </div>
          <div className="container">
            <input type="button"
                   value={l("add " + n.slice(0, -1))}
                   onClick={t.addItem} />
          </div>
        </div>
      )},
      "answers": function(){return({
        "message": function(){return(null)},
        "integer": function(){return(
          <div className="answers">
            <Answer
              name="settings"
              settings={d.settings}
              type={d.type}
              monitor={t.permeateChanges} />
          </div>
        )},
        "multiple choice": function(){
          c = Objects.subtract(c, "settings");
          return(
            <div className="answers">
              <p>{l("drag answers")}</p>
              <div className="draggable-wrapper" onDragOver={t.dragOver}>
                {Object.keys(Object.assign({}, d.choices, c)).sort(
                  (a, b) => {
                    return (
                      Object.assign({}, d.choices[a], c[a]).order -
                      Object.assign({}, d.choices[b], c[b]).order
                    )
                  }
                ).map(q => {
                  // don't show if deleted
                  if (c[q] && c[q].deleted === "deleted") return null;

                  return (
                    <Answer
                      key={q}
                      name={q}
                      draggable="true"
                      onDragEnd={t.dragEnd}
                      onDragStart={t.dragStart}
                      choice={
                                                            q[0] === "n"
                                                                ? t.addableItems[d.type]
                                                                : d.choices[q]}
                      type={d.type}
                      className={"orderable" + (c[q] && c[q].deleted === "pending" ? " deleted" : "")}
                      monitor={t.permeateChanges} />)})}
              </div>

              <div className="container">
                <input type="button"
                       value={l("add " + n.slice(0, -1))}
                       onClick={t.addItem} />
              </div>
            </div>
          )}
      }[d.type]())}
    }[n]();
  }
});

/* Mostly-encompassing, intelligent-ish <input> replacement.
 *
 * type: details what kind of input is expected
 *   string|float|integer
 * label: a text to place above the input
 *   <string>
 * classnames: a space separated string of class names
 *   <string>
 * settings: a named list of optional settings
 *   {min, max}
 *      float|integer: represents min resp. max values
 *      string: represents min resp. max string length
 * value: original value
 *   <string>|<integer>|<float>
 * monitor: onChange handler
 *   <function> receives;
 *      on error:  {id:string, error:boolean},
 *      on change: {id:string, change:boolean, value:x}
 */
var Input = React.createClass({
  getInitialState: function () {
    var p = this.props;

    return {
      value: p.value,
      display: p.value,
      classnames: [],
      errors: [],
    };
  },
  validate: function (e) {
    var s = this.state;
    var p = this.props;

    s.display = e.target.value;

    // reset errors
    s.errors = [];
    s.classnames = [];

    var type = this.type();
    switch (type) {
      case 'string':
        s.value = s.display;
        if (p.settings) {
          if (p.settings.min > s.value.length)
            s.errors = Arrays.add(s.errors,
              "Input is too short (min is " + p.settings.min + " characters)");
          if (p.settings.max < s.value.length)
            s.errors = Arrays.add(s.errors,
              "Input is too long (max is " + p.settings.max + "  characters)");
        }
        break;
      case 'integer':
      case 'float':
        // get value
        s.value = Numbers.parse[type](s.display);

        if (isNaN(s.value)) {
          s.errors = Arrays.add(s.errors,
            type === "integer"
              ? "Value is not an integer number"
              : "Value is not a number");
        } else
        if (p.settings) {
          if (p.settings.min > s.value)
            s.errors = Arrays.add(s.errors,
              "Value is too low (min is " + p.settings.min + ")");
          if (p.settings.max < s.value)
            s.errors = Arrays.add(s.errors,
              "Value is too high (max is " + p.settings.max + ")");
        }
        break;
      default:
        s.value = s.display;
        break;
    }

    var onchange = p.monitor || (x => x);
    var changed = !alike(s.value, p.value);
    if (changed) {
      s.classnames = Arrays.add(s.classnames, "changed");
    }
    if (s.errors.length > 0) {
      s.classnames = Arrays.add(s.classnames, "error");
      onchange(p.name, {
        error: true
      });
    } else {
      s.classnames = Arrays.add(s.classnames, "valid");
      onchange(p.name, {
        change: changed,
        value: s.value
      })
    }

    this.setState(s);
  },
  type: function () {
    var t = this.props.type;
    return (
      ['integer', 'number'].indexOf(t) >= 0 ? 'integer' :
        ['float', 'decimal'].indexOf(t) >= 0 ? 'float' :
          ['string', 'text'].indexOf(t) >= 0 ? 'string' :
            'default' // default
    )
  },
  render: function () {
    var s = this.state;
    var p = this.props;

    var type = this.type();
    var inputType = (
      ['integer', 'float'].indexOf(type) >= 0 ? 'number' :
        ['string'].indexOf(type) >= 0 ? 'text' :
          'text' // default
    )
    var classnames = p.className
      ? Arrays.unique(p.className.split(" ").concat(s.classnames))
      : s.classnames;

    const attrs = {};

    if (type === 'float') {
      attrs.step = '0.01';
    } else if (type === 'integer') {
      attrs.step = '1';
    }

    return (
      <label className={"smartInput " + classnames.join(" ")}>
        <p>{p.label}</p>
        <input
          title={type}
          type={inputType}
          value={s.display}
          onChange={this.validate}
          {...attrs}
        />

        <p className="error">{s.errors.join(
          <br />
        )}</p>
      </label>
    );
  }
});


var Popup; // babel-global object for instantiating modal popups
var Modal = React.createClass({
  getInitialState: function () {
    return {
      message: "",
      type: "none"
    }
  },
  componentDidMount: function () {
    Popup = {set: this.set}
  },
  componentWillUnmount: function () {
    Popup = undefined;
  },
  set: function (message, options, type) {
    if ("options" in this.state)
      if ("onOverride" in this.state.options)
        if (typeof this.state.options.onOverride === "function")
          this.state.options.onOverride();
    this.dismiss();

    // initiate new modal
    var state = this.getInitialState();
    state.message = message || "";
    delete state.type;

    if (typeof options === "object") state.options = options;
    if (typeof type === "string") state.type = type;

    // timed interactions
    if (typeof options !== "undefined") {
      if ("showUntil" in options || "showFor" in options) {
        var duration = "showUntil" in options
          ? options.showUntil - +new Date()
          : options.showFor;

        if (duration > 0) {
          state.timer = setTimeout(() => {
            if ("onTimeout" in options)
              if (typeof options.onTimeout === "function")
                options.onTimeout();
            this.dismiss();
          }, duration);
        } else {
          // don't display a modal
          this.setState(this.getInitialState());
          return;
        }
      }
    }

    this.replaceState(state);
  },
  dismiss: function () {
    var t = this,
      s = t.state,
      o = s.options || {};

    if ("timer" in s) clearTimeout(s.timer);
    if ("onEnd" in o && typeof o.onEnd === "function") o.onEnd();

    this.replaceState(this.getInitialState());
  },
  render: function () {
    var t = this,
      p = t.props,
      s = t.state,
      o = s.options || {};

    return s.type === "none" ? null : (
      <div className={p.className}>
        <p>
          {s.message}
          {typeof o === "object" && "actionables" in o
            ? o.actionables.map(action =>
            <a  key={action.label}
                onClick={() => {
                                                if ("onAction" in o && typeof o.onAction === "function")
                                                    o.onAction();

                                                if (typeof action.fnc === "function")
                                                    action.fnc();

                                                this.dismiss();
                                            }}>

              {action.label.toUpperCase()}
            </a>) : null}

          {"type" in s && s.type === "wait" ?
            <span className="spinner">
                                        <span className="double-bounce1" />
                                        <span className="double-bounce2" />
                                    </span> : ""}

        </p>
      </div>
    )
  }
});

// Render
ReactDOM.render(
  <Questionnaire questionnaire={questionnaire} />,
  document.getElementById('react-app')
);
ReactDOM.render(
  <Modal className="modal" />,
  document.getElementById('react-popup')
);
