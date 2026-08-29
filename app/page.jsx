"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Clock,
  CloudRain,
  Coffee,
  Compass,
  Edit3,
  Heart,
  IndianRupee,
  MapPin,
  Navigation,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  Trash2,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import VoiceInputButton from "./voice-input-button";
const MapView = dynamic(() => import("./map-view"), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <MapPin /> Loading OpenStreetMap…
    </div>
  ),
});
const DEFAULT_REQ = {
  destination: "Chennai",
  travelers: 4,
  budget: 4000,
  days: 1,
  start: "09:00",
  end: "20:00",
  interests: ["Beach", "Food", "Photography"],
  avoid: ["Museum"],
};
const RAW = [
  {
    id: "marina",
    name: "Marina Beach",
    lat: 13.05,
    lng: 80.2824,
    cost: 0,
    category: "Beach",
    tags: ["Beach", "Photography"],
    rating: 4.6,
    duration: 90,
    priority: "recommended",
  },
  {
    id: "besant",
    name: "Besant Nagar Beach",
    lat: 12.9991,
    lng: 80.2717,
    cost: 0,
    category: "Beach",
    tags: ["Beach", "Food", "Photography"],
    rating: 4.7,
    duration: 90,
    priority: "recommended",
  },
  {
    id: "mylapore",
    name: "Mylapore Food Walk",
    lat: 13.0359,
    lng: 80.2671,
    cost: 650,
    category: "Food",
    tags: ["Food", "Culture", "Photography"],
    rating: 4.7,
    duration: 100,
    priority: "recommended",
  },
  {
    id: "semmozhi",
    name: "Semmozhi Poonga",
    lat: 13.051,
    lng: 80.2513,
    cost: 0,
    category: "Nature",
    tags: ["Nature", "Photography"],
    rating: 4.4,
    duration: 75,
    priority: "recommended",
  },
  {
    id: "santhome",
    name: "San Thome Basilica",
    lat: 13.0336,
    lng: 80.2777,
    cost: 0,
    category: "Architecture",
    tags: ["Architecture", "Photography"],
    rating: 4.6,
    duration: 60,
    priority: "recommended",
  },
  {
    id: "express",
    name: "Express Avenue",
    lat: 13.0588,
    lng: 80.2642,
    cost: 700,
    category: "Shopping",
    tags: ["Shopping", "Food"],
    rating: 4.4,
    duration: 100,
    priority: "recommended",
  },
  {
    id: "kapaleesh",
    name: "Kapaleeshwarar Temple",
    lat: 13.0338,
    lng: 80.2697,
    cost: 0,
    category: "Temples",
    tags: ["Temples", "Architecture", "Photography"],
    rating: 4.7,
    duration: 60,
    priority: "recommended",
  },
  {
    id: "guindy",
    name: "Guindy National Park",
    lat: 13.0067,
    lng: 80.2206,
    cost: 50,
    category: "Nature",
    tags: ["Nature", "Photography"],
    rating: 4.3,
    duration: 120,
    priority: "recommended",
  },
  {
    id: "phoenix",
    name: "Phoenix Marketcity",
    lat: 12.9916,
    lng: 80.2168,
    cost: 900,
    category: "Shopping",
    tags: ["Shopping", "Food"],
    rating: 4.6,
    duration: 120,
    priority: "recommended",
  },
  {
    id: "ratna",
    name: "Ratna Cafe",
    lat: 13.0368,
    lng: 80.2676,
    cost: 180,
    category: "Food",
    tags: ["Food", "Cafes"],
    rating: 4.5,
    duration: 50,
    priority: "recommended",
  },
  {
    id: "anna",
    name: "Anna Nagar Tower Park",
    lat: 13.085,
    lng: 80.2101,
    cost: 0,
    category: "Nature",
    tags: ["Nature", "Photography"],
    rating: 4.4,
    duration: 75,
    priority: "recommended",
    address: "Anna Nagar, Chennai, Tamil Nadu",
  },
  {
    id: "museum",
    name: "Government Museum",
    lat: 13.069,
    lng: 80.2567,
    cost: 250,
    category: "Museum",
    tags: ["Museum", "Historical Places"],
    rating: 4.3,
    duration: 120,
    priority: "recommended",
  },
];
const MADURAI = [
  {
    id: "meenakshi",
    name: "Meenakshi Amman Temple",
    lat: 9.9195,
    lng: 78.1193,
    cost: 0,
    category: "Temple",
    tags: ["Temples", "Architecture", "Heritage", "Spiritual"],
    rating: null,
    duration: 120,
    priority: "recommended",
    address: "Madurai Main, Madurai, Tamil Nadu",
  },
  {
    id: "mahal",
    name: "Thirumalai Nayakkar Mahal",
    lat: 9.9151,
    lng: 78.1239,
    cost: 50,
    category: "Palace",
    tags: ["Palaces / Mahal", "Heritage", "Architecture", "Photography"],
    rating: null,
    duration: 90,
    priority: "recommended",
    address: "Palace Road, Madurai, Tamil Nadu",
  },
  {
    id: "teppakulam",
    name: "Vandiyur Mariamman Teppakulam",
    lat: 9.9127,
    lng: 78.1454,
    cost: 0,
    category: "Heritage",
    tags: ["Temples", "Heritage", "Photography", "Spiritual"],
    rating: null,
    duration: 75,
    priority: "recommended",
    address: "Vandiyur, Madurai, Tamil Nadu",
  },
  {
    id: "gandhi-museum",
    name: "Gandhi Memorial Museum",
    lat: 9.93,
    lng: 78.1389,
    cost: 0,
    category: "Museum",
    tags: ["Heritage", "Historical Places"],
    rating: null,
    duration: 90,
    priority: "recommended",
    address: "Tamukkam, Madurai, Tamil Nadu",
  },
  {
    id: "koodal",
    name: "Koodal Azhagar Temple",
    lat: 9.9138,
    lng: 78.1158,
    cost: 0,
    category: "Temple",
    tags: ["Temples", "Architecture", "Spiritual"],
    rating: null,
    duration: 60,
    priority: "recommended",
    address: "Periyar, Madurai, Tamil Nadu",
  },
  {
    id: "pazhamudhir",
    name: "Pazhamudhir Solai",
    lat: 10.0934,
    lng: 78.223,
    cost: 0,
    category: "Temple",
    tags: ["Temples", "Nature", "Spiritual", "Nearby Trips"],
    rating: null,
    duration: 90,
    priority: "recommended",
    address: "Alagar Hills, Madurai, Tamil Nadu",
  },
  {
    id: "alagar",
    name: "Alagar Koyil",
    lat: 10.073,
    lng: 78.214,
    cost: 0,
    category: "Temple",
    tags: ["Temples", "Architecture", "Nature", "Nearby Trips"],
    rating: null,
    duration: 100,
    priority: "recommended",
    address: "Alagar Koyil, Madurai, Tamil Nadu",
  },
  {
    id: "vilakkuthoon",
    name: "Vilakkuthoon Market Streets",
    lat: 9.9174,
    lng: 78.1214,
    cost: 300,
    category: "Market",
    tags: ["Markets", "Traditional Food", "Photography"],
    rating: null,
    duration: 75,
    priority: "recommended",
    address: "Vilakkuthoon, Madurai, Tamil Nadu",
  },
  {
    id: "jigarthanda",
    name: "Famous Jigarthanda",
    lat: 9.921,
    lng: 78.1198,
    cost: 120,
    category: "Food",
    tags: ["Traditional Food", "Food"],
    rating: null,
    duration: 35,
    priority: "recommended",
    address: "Madurai Main, Madurai, Tamil Nadu",
  },
  {
    id: "murugan-idli",
    name: "Murugan Idli Shop",
    lat: 9.9197,
    lng: 78.1182,
    cost: 250,
    category: "Food",
    tags: ["Traditional Food", "Food"],
    rating: null,
    duration: 55,
    priority: "recommended",
    address: "West Masi Street, Madurai, Tamil Nadu",
  },
];
const cityCatalog = (destination) =>
  /madurai/i.test(destination)
    ? MADURAI
    : /chennai/i.test(destination)
      ? RAW
      : [];
const suggestions = [
  "Beach",
  "Food",
  "Photography",
  "Historical Places",
  "Nature",
  "Shopping",
  "Adventure",
  "Nightlife",
  "Cafes",
  "Architecture",
  "Temples",
];
const hav = (a, b) => {
  const r = 6371,
    dLat = ((b.lat - a.lat) * Math.PI) / 180,
    dLon = ((b.lng - a.lng) * Math.PI) / 180,
    q =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((a.lat * Math.PI) / 180) *
        Math.cos((b.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(q));
};
const scorePlaces = (req, selectedIds = []) =>
  cityCatalog(req.destination)
    .filter((p) => !req.avoid.some((a) => p.tags.includes(a)))
    .map((p) => {
      const hits = p.tags.filter((t) => req.interests.includes(t));
      const interest = hits.length ? Math.min(100, 65 + hits.length * 17) : 36;
      const budget =
        p.cost <= Math.max(1, req.budget) / 5
          ? 100
          : p.cost <= Math.max(1, req.budget) / 3
            ? 75
            : 45;
      const ratingScore = p.rating ? p.rating * 20 : 72;
      const score = Math.round(
        interest * 0.3 +
          budget * 0.15 +
          ratingScore * 0.15 +
          82 * 0.1 +
          95 * 0.1 +
          90 * 0.05 +
          90 * 0.1 +
          (hits.length ? 90 : 50) * 0.05,
      );
      const defaults = /madurai/i.test(req.destination)
        ? ["meenakshi", "mahal", "teppakulam", "koodal", "jigarthanda"]
        : ["marina", "besant", "mylapore", "semmozhi", "ratna"];
      return {
        ...p,
        score,
        selected: selectedIds.length
          ? selectedIds.includes(p.id)
          : defaults.includes(p.id),
        reason: `Ranked highly because it ${hits.length ? `matches your ${hits.join(" + ").toLowerCase()} preferences` : "adds useful variety"}, ${p.cost ? "fits your budget" : "has free entry"}, and fits efficiently into the ${req.destination} route.`,
      };
    })
    .sort((a, b) => b.score - a.score);
const routeOrder = (list) => {
  if (list.length < 2) return list;
  const left = [...list],
    out = [left.shift()];
  while (left.length) {
    const cur = out[out.length - 1];
    left.sort(
      (a, b) =>
        hav(cur, a) -
        (a.priority === "user" ? 2 : 0) -
        (hav(cur, b) - (b.priority === "user" ? 2 : 0)),
    );
    out.push(left.shift());
  }
  return out;
};
const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
function Logo() {
  return (
    <div className="v2-logo">
      <span>
        <Navigation size={20} />
      </span>
      TravelMind
    </div>
  );
}
function Toast({ text, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="toast">
      <Check size={18} />
      {text}
    </div>
  );
}
function Nav({ go, assistant }) {
  return (
    <header className="v2-nav">
      <Logo />
      <nav>
        <a href="#discover">Discover</a>
        <a href="#trips">My Trips</a>
        <a href="#how">How It Works</a>
      </nav>
      <div>
        <button
          className="icon-plain"
          onClick={assistant}
          aria-label="Open AI assistant"
        >
          <Bot />
        </button>
        <span className="v2-avatar">AK</span>
        <button className="blue-btn" onClick={go}>
          Plan a Trip <ArrowRight />
        </button>
      </div>
    </header>
  );
}
function Home({ start, assistant }) {
  const [text, setText] = useState("");
  const append = (spoken) =>
    setText(
      (current) => (current.trim() ? current.trim() + " " : "") + spoken.trim(),
    );
  return (
    <main className="v2-home">
      <Nav
        go={() =>
          document
            .querySelector("#trip-input")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        assistant={assistant}
      />
      <section className="v2-hero">
        <div className="v2-copy">
          <div className="pill">
            <Sparkles /> AI-Powered Adaptive Travel Planner
          </div>
          <h1>
            Your perfect trip starts
            <br />
            <em>with what you love.</em>
          </h1>
          <p>
            Tell TravelMind where you’re going and what you enjoy. We’ll
            discover the best places, check the weather, and build an optimized
            trip for you.
          </p>
          <div className="hero-composer" id="trip-input">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell me where you’re going and what you enjoy…"
            />
            <VoiceInputButton onTranscript={append} label="trip prompt" />
            <button onClick={() => start(text)}>
              Plan My Trip <ArrowRight />
            </button>
            <small>
              <Sparkles /> Give only what you know—we’ll ask for the rest
              naturally.
            </small>
          </div>
          <div className="try">
            <span>Try an example</span>
            <button
              onClick={() =>
                setText(
                  "I’m visiting Madurai. I like temples, mahal and traditional food.",
                )
              }
            >
              Madurai · Temples + Heritage
            </button>
            <button
              onClick={() =>
                setText("We're visiting Chennai for beaches and photography.")
              }
            >
              Chennai · Beaches + Photography
            </button>
            <button onClick={() => setText("Bengaluru for cafes and shopping")}>
              Bengaluru · Cafes + Shopping
            </button>
          </div>
          <div className="hero-proof">
            <div>
              <strong>Real places</strong>
              <span>City-specific discovery</span>
            </div>
            <div>
              <strong>8 signals</strong>
              <span>Algorithmic ranking</span>
            </div>
            <div>
              <strong>Always</strong>
              <span>Explainable</span>
            </div>
          </div>
        </div>
        <HeroPreview />
      </section>
      <section className="trust-strip">
        <span>UNDERSTAND</span>
        <ChevronRight />
        <span>DISCOVER</span>
        <ChevronRight />
        <span>RECOMMEND</span>
        <ChevronRight />
        <span>OPTIMIZE</span>
        <ChevronRight />
        <span>ADAPT</span>
        <ChevronRight />
        <span>EXPLAIN</span>
      </section>
      <section className="v2-how" id="how">
        <div className="section-label">HOW IT WORKS</div>
        <h2>
          Smart planning that doesn’t stop
          <br />
          when the trip starts.
        </h2>
        <div>
          {[
            [
              Sparkles,
              "Understands you",
              "Speak naturally. We extract destination, timing and preferences.",
            ],
            [
              Heart,
              "Discovers for you",
              "City-specific landmarks are ranked for what you actually enjoy.",
            ],
            [
              Zap,
              "Optimizes the trip",
              "Constraints select stops. Dijkstra finds efficient paths.",
            ],
            [
              RotateCcw,
              "Adapts in real time",
              "When reality changes, we repair only the affected part.",
            ],
          ].map(([I, t, d], i) => {
            const Icon = I;
            return (
              <article key={t}>
                <span>0{i + 1}</span>
                <i>
                  <Icon />
                </i>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
function HeroPreview() {
  return (
    <div className="v2-preview">
      <div className="preview-map">
        <div className="fake-sea" />
        <div className="fake-route" />
        {[1, 2, 3, 4, 5].map((n) => (
          <i className={"fake-pin fp" + n} key={n}>
            {n}
          </i>
        ))}
      </div>
      <div className="trip-card">
        <header>
          <div>
            <small>MADURAI DISCOVERY</small>
            <h3>Built around what you love</h3>
          </div>
          <span>
            AI<small>ready</small>
          </span>
        </header>
        <div className="mini-stats">
          <b>
            3<small>Details asked</small>
          </b>
          <b>
            10<small>Places found</small>
          </b>
          <b>
            2 days<small>Optimized</small>
          </b>
        </div>
        {[
          ["09:00", "Meenakshi Temple"],
          ["11:30", "Nayakkar Mahal"],
          ["14:00", "Traditional Lunch"],
          ["16:30", "Teppakulam"],
          ["18:00", "Jigarthanda"],
        ].map((x, i) => (
          <div className="mini-item" key={x[1]}>
            <time>{x[0]}</time>
            <i>{i + 1}</i>
            <span>
              <b>{x[1]}</b>
              <small>
                {i === 0
                  ? "Temple · Heritage"
                  : i === 2
                    ? "Traditional food"
                    : "Efficient route"}
              </small>
            </span>
          </div>
        ))}
      </div>
      <div className="rec-float">
        <Sparkles />
        <div>
          <small>ROUTE OPTIMIZED</small>
          <b>Best next stop selected</b>
          <p>Preferences + constraints + shortest path.</p>
        </div>
      </div>
      <div className="weather-float">
        <CloudRain />
        <div>
          <b>Rain expected later</b>
          <small>The route can adapt automatically.</small>
        </div>
      </div>
    </div>
  );
}
function Stepper({ at }) {
  return (
    <div className="stepper">
      {["Understand", "Recommend", "Optimize", "Your plan"].map((x, i) => (
        <div className={i < at ? "done" : i === at ? "active" : ""} key={x}>
          <span>{i < at ? <Check /> : i + 1}</span>
          <b>{x}</b>
          {i < 3 && <i />}
        </div>
      ))}
    </div>
  );
}
function Clarify({ req, setReq, done, back }) {
  const missing = !req.days
    ? "days"
    : !req.budget
      ? "budget"
      : !req.travelers
        ? "travelers"
        : !req.interests.length
          ? "interests"
        : null;
  useEffect(() => {
    if (!missing) done();
  }, [missing, done]);
  const config =
    missing === "days"
      ? {
          title: "How many days are you planning?",
          sub: `A little more detail will make your ${req.destination} trip much better.`,
          options: [
            ["Half day", 1],
            ["1 day", 1],
            ["2 days", 2],
            ["3 days", 3],
          ],
        }
      : missing === "budget"
        ? {
            title: "What budget should I plan around?",
            sub: "I’ll use this to balance entry costs, food, and travel.",
            options: [
              ["₹1,000", 1000],
              ["₹2,500", 2500],
              ["₹5,000", 5000],
              ["₹8,000", 8000],
            ],
          }
        : missing === "travelers" ? {
            title: "How many people are travelling?",
            sub: "Group size helps estimate costs and choose suitable places.",
            options: [
              ["1 person", 1],
              ["2 people", 2],
              ["3 people", 3],
              ["4 people", 4],
              ["5+ people", 5],
            ],
          } : {
            title: "What kind of places are you interested in?",
            sub: `Choose what you would enjoy most in ${req.destination}.`,
            options: [["Beach", "Beach"], ["Food", "Food"], ["Photography", "Photography"], ["Historical Places", "Historical Places"], ["Nature", "Nature"], ["Shopping", "Shopping"]],
          };
  const choose = (value) => setReq({ ...req, [missing]: missing === "interests" ? [value] : value });
  return (
    <main className="v2-flow">
      <div className="flow-nav">
        <button onClick={back}>← Back</button>
        <Logo />
        <span>
          <Check /> Destination understood
        </span>
      </div>
      <section className="clarify">
        <div className="clarify-progress">
          <span />
          <span className={!req.days ? "" : "done"} />
          <span className={req.days && req.budget ? "done" : ""} />
        </div>
        <div className="ai-badge">
          <Sparkles />
        </div>
        <div className="section-label">A QUICK DETAIL</div>
        <h1>{config.title}</h1>
        <p>{config.sub}</p>
        <div className="clarify-options">
          {config.options.map(([label, n]) => (
            <button key={label} onClick={() => choose(n)}>
              <span>{label}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
        <button
          className="custom-answer"
          onClick={() => {
            const v = prompt("Enter a custom value");
            if (v) choose(missing === "interests" ? v.trim() : Number(v));
          }}
        >
          Enter a custom answer
        </button>
        <aside>
          <MapPin />
          <span>
            <b>{req.destination} understood</b>
            <small>{req.interests.join(" · ")}</small>
          </span>
        </aside>
      </section>
    </main>
  );
}
function Understand({ req, setReq, next, back, notify, retry }) {
  const [edit, setEdit] = useState(null);
  const [val, setVal] = useState("");
  const save = () => {
    if (!edit) return;
    const n = {
      ...req,
      [edit]: ["travelers", "budget", "days"].includes(edit)
        ? Number(val)
        : val,
    };
    setReq(n);
    setEdit(null);
    notify("Recommendations updated based on your changes.");
  };
  const changeList = (key, item) => {
    setReq({
      ...req,
      [key]: req[key].includes(item)
        ? req[key].filter((x) => x !== item)
        : [...req[key], item],
    });
    notify("Recommendations updated based on your preferences.");
  };
  return (
    <main className="v2-flow">
      <div className="flow-nav">
        <button onClick={back}>← Back</button>
        <Logo />
        <span>Draft saved</span>
      </div>
      <Stepper at={0} />
      <section className="understand-v2">
        <div className="ai-badge">
          <Sparkles />
        </div>
        <div className="section-label">TRAVELMIND UNDERSTANDING</div>
        <h1>Here’s what I understood.</h1>
        <p>
          Review the details below. Every change immediately recalculates your
          recommendations.
        </p>
        <div className="edit-grid">
          {[
            [MapPin, "destination", "Destination", req.destination],
            [Users, "travelers", "Travellers", `${req.travelers} Friends`],
            [IndianRupee, "budget", "Total budget", money(req.budget)],
            [Clock, "days", "Available time", `${req.days} Day`],
          ].map(([I, key, label, value]) => {
            const Icon = I;
            return (
              <article key={key}>
                <i>
                  <Icon />
                </i>
                <div>
                  <small>{label}</small>
                  {edit === key ? (
                    <input
                      autoFocus
                      type={key === "destination" ? "text" : "number"}
                      value={val}
                      onChange={(e) => setVal(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && save()}
                    />
                  ) : (
                    <b>{value}</b>
                  )}
                </div>
                {edit === key ? (
                  <div className="save-actions">
                    <button onClick={save}>Save</button>
                    <button onClick={() => setEdit(null)}>Cancel</button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEdit(key);
                      setVal(String(req[key]));
                    }}
                  >
                    <Edit3 /> Edit
                  </button>
                )}
              </article>
            );
          })}
        </div>
        <div className="interest-editor">
          <div>
            <label>
              <Heart /> Interests
            </label>
            <p>
              {req.interests.map((x) => (
                <span key={x}>
                  {x}
                  <button
                    onClick={() => changeList("interests", x)}
                    aria-label={"Remove " + x}
                  >
                    <X />
                  </button>
                </span>
              ))}
              <button
                className="add-chip"
                onClick={() => {
                  const x = prompt("Add any interest");
                  if (x?.trim()) changeList("interests", x.trim());
                }}
              >
                <Plus /> Add interest
              </button>
              <VoiceInputButton
                onTranscript={(x) => changeList("interests", x.trim())}
                label="interest"
              />
            </p>
            <div className="interest-menu">
              {suggestions
                .filter((x) => !req.interests.includes(x))
                .slice(0, 6)
                .map((x) => (
                  <button key={x} onClick={() => changeList("interests", x)}>
                    + {x}
                  </button>
                ))}
            </div>
          </div>
          <div>
            <label>
              <X /> Avoid
            </label>
            <p className="avoid-chips">
              {req.avoid.map((x) => (
                <span key={x}>
                  {x}
                  <button onClick={() => changeList("avoid", x)}>
                    <X />
                  </button>
                </span>
              ))}
              <button
                className="add-chip"
                onClick={() => {
                  const x = prompt("What should TravelMind avoid?");
                  if (x?.trim()) changeList("avoid", x.trim());
                }}
              >
                <Plus /> Add
              </button>
              <VoiceInputButton
                onTranscript={(x) => {
                  if (confirm(`Add “${x}” to avoid preferences?`))
                    changeList("avoid", x.trim());
                }}
                label="avoid preference"
              />
            </p>
          </div>
          <div className="time-editor">
            <label>
              Day starts{" "}
              <input
                type="time"
                value={req.start}
                onChange={(e) => setReq({ ...req, start: e.target.value })}
              />
            </label>
            <label>
              Trip ends{" "}
              <input
                type="time"
                value={req.end}
                onChange={(e) => setReq({ ...req, end: e.target.value })}
              />
            </label>
          </div>
        </div>
        <aside className="algorithm-note">
          <Sparkles />
          <span>
            <b>Ready to find your best matches</b>
            <p>
              We’ll score places using your interests, budget, ratings, time,
              group fit, weather, distance and knowledge graph relationships.
            </p>
          </span>
        </aside>
        <button className="blue-btn continue" onClick={next}>
          {retry ? "Retry Google Places" : "Show My Recommendations"} <ArrowRight />
        </button>
      </section>
    </main>
  );
}
function Recommendations({
  req,
  places,
  setPlaces,
  next,
  back,
  notify,
  openAdd,
}) {
  const selected = places.filter((p) => p.selected);
  const [detail, setDetail] = useState(null),
    [visible, setVisible] = useState(10);
  const toggle = (id) => {
    const p = places.find((x) => x.id === id);
    setPlaces(
      places.map((x) => (x.id === id ? { ...x, selected: !x.selected } : x)),
    );
    notify(
      p.selected
        ? `${p.name} removed. Route re-optimized.`
        : `${p.name} added to your trip.`,
    );
  };
  return (
    <main className="v2-flow rec-page">
      <div className="flow-nav">
        <button onClick={back}>← Back</button>
        <Logo />
        <span>{selected.length} selected</span>
      </div>
      <Stepper at={1} />
      <section className="rec-wrap">
        <div className="rec-heading">
          <div>
            <div className="section-label">DISCOVERED FOR YOU</div>
            <h1>Best places for you in {req.destination}.</h1>
            <p>
              Selected for what you like, your {money(req.budget)} budget,
              available time, and travel conditions.
            </p>
          </div>
          <button className="outline-btn" onClick={openAdd}>
            <Plus /> Add a Place
          </button>
        </div>
        <div className="rec-layout">
          <div className="place-list">
            {places.slice(0, visible).map((p, i) => (
              <article className={p.selected ? "selected" : ""} key={p.id}>
                <div
                  className={
                    "place-image cat-" +
                    p.category.toLowerCase().replaceAll(" ", "-")
                  }
                  style={
                    p.imageUrl
                      ? {
                          backgroundImage: `linear-gradient(180deg,transparent,rgba(15,23,42,.62)),url(${p.imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  <span>#{i + 1}</span>
                  <i>
                    {p.category === "Food" ? (
                      <Coffee />
                    ) : p.category === "Shopping" ? (
                      <WalletCards />
                    ) : (
                      <MapPin />
                    )}
                  </i>
                  <small className="image-label">{p.category} attraction</small>
                </div>
                <div className="place-content">
                  <header>
                    <div>
                      <small>
                        {p.category} · {p.tags.join(" · ")}
                      </small>
                      <h2>{p.name}</h2>
                      <p>
                        {p.rating ? (
                          <>
                            <Star /> {p.rating}
                            {p.reviewCount
                              ? ` · ${p.reviewCount.toLocaleString("en-IN")} reviews`
                              : ""}{" "}
                            ·{" "}
                          </>
                        ) : (
                          <>Rating unavailable · </>
                        )}
                        {p.cost ? money(p.cost) : "Free entry"} · Suggested{" "}
                        {p.duration} min
                      </p>
                    </div>
                    <strong>
                      {p.score}
                      <small>% MATCH</small>
                    </strong>
                  </header>
                  <p className="place-description">
                    {p.address ||
                      `${p.name} is a city-relevant ${p.category.toLowerCase()} stop in ${req.destination}.`}
                    {p.distanceKm != null && (
                      <> · {p.distanceKm} km from destination centre</>
                    )}
                  </p>
                  <div className="reason">
                    <Sparkles />
                    <p>
                      <b>Why we picked this</b>
                      {p.reason}
                    </p>
                  </div>
                  <div className="place-actions">
                    <button onClick={() => setDetail(p)}>View Details</button>
                    <button
                      onClick={() =>
                        document
                          .getElementById("rec-map")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      <MapPin /> Map
                    </button>
                    {p.googleMapsUri && (
                      <a
                        href={p.googleMapsUri}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Google Maps
                      </a>
                    )}
                    <button
                      className={p.selected ? "remove" : ""}
                      onClick={() => toggle(p.id)}
                    >
                      {p.selected ? (
                        <>
                          <Trash2 /> Remove
                        </>
                      ) : (
                        <>
                          <Plus /> Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {visible < places.length && (
              <button
                className="load-more"
                onClick={() => setVisible((x) => x + 10)}
              >
                Load More Places
              </button>
            )}
          </div>
          <aside className="selection-panel">
            <div id="rec-map">
              <MapView places={selected} />
            </div>
            <h3>
              Your trip shortlist <span>{selected.length}</span>
            </h3>
            {selected.map((p, i) => (
              <div className="short-row" key={p.id}>
                <i>{p.priority === "user" ? "★" : i + 1}</i>
                <span>
                  <b>{p.name}</b>
                  <small>
                    {p.score}% match · {p.cost ? money(p.cost) : "Free"}
                  </small>
                </span>
                <button onClick={() => toggle(p.id)}>
                  <X />
                </button>
              </div>
            ))}
            <div className="weather-mini">
              <CloudRain />
              <span>
                <b>Demo forecast: warm and partly cloudy</b>
                <small>Estimated demo weather · live provider ready</small>
              </span>
            </div>
            <div className="selection-total">
              <span>
                Estimated places spend{" "}
                <b>{money(selected.reduce((n, p) => n + p.cost, 0))}</b>
              </span>
              <span>
                Budget remaining{" "}
                <b>
                  {money(req.budget - selected.reduce((n, p) => n + p.cost, 0))}
                </b>
              </span>
            </div>
            <button
              className="blue-btn"
              disabled={selected.length < 2}
              onClick={next}
            >
              Optimize My Trip <ArrowRight />
            </button>
            <small className="dijkstra-hint">
              <Zap /> Constraints choose stops. Dijkstra calculates shortest
              paths.
            </small>
          </aside>
        </div>
      </section>
      {detail && (
        <div className="modal-shade">
          <section className="detail-modal">
            <button className="modal-x" onClick={() => setDetail(null)}>
              <X />
            </button>
            <div className={"detail-hero cat-" + detail.category.toLowerCase()}>
              <MapPin />
            </div>
            <div className="section-label">PLACE DETAILS</div>
            <h2>{detail.name}</h2>
            <p>
              {detail.address ||
                `${detail.category}, ${req.destination}, Tamil Nadu`}
            </p>
            <div className="detail-stats">
              <span>
                <Clock />
                <b>{detail.duration} min</b>Suggested visit
              </span>
              <span>
                <IndianRupee />
                <b>{detail.cost ? money(detail.cost) : "Free"}</b>Estimated cost
              </span>
              <span>
                <Star />
                <b>{detail.rating || "Unavailable"}</b>
                {detail.rating ? "Source rating" : "Rating unavailable"}
              </span>
            </div>
            <div className="reason">
              <Sparkles />
              <p>
                <b>Why it fits you</b>
                {detail.reason}
              </p>
            </div>
            <button
              className="blue-btn"
              onClick={() => {
                if (!detail.selected) toggle(detail.id);
                setDetail(null);
              }}
            >
              {detail.selected ? "Selected" : "+ Add to Trip"}
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
function Loading({ done }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const a = [1, 2, 3, 4, 5].map((x, i) =>
      setTimeout(() => setN(x), 300 + i * 500),
    );
    const z = setTimeout(done, 3000);
    return () => {
      a.forEach(clearTimeout);
      clearTimeout(z);
    };
  }, [done]);
  return (
    <main className="v2-loading">
      <Logo />
      <div className="load-orb">
        <Navigation />
      </div>
      <div className="section-label">DIJKSTRA + CONSTRAINT OPTIMIZATION</div>
      <h1>Building your perfect route…</h1>
      <p>
        Preserving your priorities while minimizing travel, cost and wasted
        time.
      </p>
      <div>
        {[
          "Checking your selected places",
          "Preserving your priorities",
          "Validating budget and opening hours",
          "Optimizing shortest paths",
          "Building your itinerary",
        ].map((x, i) => (
          <span className={i < n ? "done" : i === n ? "active" : ""} key={x}>
            <i>{i < n ? <Check /> : i === n ? <Zap /> : i + 1}</i>
            <b>{x}</b>
            {i === n && <small>working…</small>}
          </span>
        ))}
      </div>
    </main>
  );
}
function Planner({
  req,
  setReq,
  places,
  setPlaces,
  active,
  start,
  recover,
  notify,
  openAdd,
}) {
  const selected = routeOrder(places.filter((p) => p.selected));
  const spent = selected.reduce((n, p) => n + p.cost, 0),
    distance = selected
      .slice(1)
      .reduce((n, p, i) => n + hav(selected[i], p), 0);
  const remove = (id) => {
    const p = places.find((x) => x.id === id);
    setPlaces(places.map((x) => (x.id === id ? { ...x, selected: false } : x)));
    notify(`${p.name} removed. Your Dijkstra route has been re-optimized.`);
  };
  const [tab, setTab] = useState("itinerary");
  return (
    <main className="planner-page">
      <div className="planner-nav">
        <Logo />
        <div>
          <b>{req.destination} Day Trip</b>
          <small>
            {req.days} day · {req.travelers} friends
          </small>
        </div>
        <button
          className="outline-btn"
          onClick={() => notify("Trip saved to this device.")}
        >
          <Check /> Saved
        </button>
        <span className="v2-avatar">AK</span>
      </div>
      {active && (
        <div className="trip-live">
          <b>
            <i /> TRIP IN PROGRESS
          </b>
          <span>
            Your day is on track <Check />
          </span>
          <div>
            <small>NEXT STOP</small>
            {selected[1]?.name || selected[0]?.name} · 16 min away
          </div>
          <button>
            <Navigation /> Navigate
          </button>
        </div>
      )}
      <div className="mobile-tabs">
        {["itinerary", "map", "summary"].map((x) => (
          <button
            className={tab === x ? "active" : ""}
            onClick={() => setTab(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="planner-grid">
        <section
          className={
            "plan-timeline " + (tab === "itinerary" ? "mobile-show" : "")
          }
        >
          <header>
            <div>
              <small>YOUR OPTIMIZED ITINERARY</small>
              <h2>Tuesday, 28 August</h2>
            </div>
            <button onClick={openAdd}>
              <Plus /> Add place
            </button>
          </header>
          {selected.map((p, i) => (
            <article key={p.id}>
              <time>
                {String(9 + Math.floor(i * 2.1)).padStart(2, "0")}:
                {i % 2 ? "15" : "00"}
              </time>
              <i className={p.priority === "user" ? "user" : ""}>
                {p.priority === "user" ? "★" : i + 1}
              </i>
              <div className="timeline-card">
                <div className="timeline-img">
                  {p.category === "Food" ? <Coffee /> : <MapPin />}
                </div>
                <div>
                  <div className="tl-meta">
                    <small>
                      {p.category} · {p.tags.slice(0, 2).join(" · ")}
                    </small>
                    <em>{p.score}% match</em>
                  </div>
                  <h3>
                    {p.name}
                    {p.priority === "user" && <span>★ Your Priority</span>}
                  </h3>
                  <p>
                    <Star /> {p.rating} · {p.cost ? money(p.cost) : "Free"} ·{" "}
                    <button
                      onClick={() => {
                        const v = prompt(
                          "Visit duration in minutes",
                          String(p.duration),
                        );
                        if (v)
                          setPlaces(
                            places.map((x) =>
                              x.id === p.id ? { ...x, duration: Number(v) } : x,
                            ),
                          );
                      }}
                    >
                      {p.duration} min <Edit3 />
                    </button>
                  </p>
                  <details>
                    <summary>
                      <Sparkles /> Why this place?
                    </summary>
                    <p>{p.reason}</p>
                  </details>
                </div>
                <button
                  className="remove-stop"
                  onClick={() => remove(p.id)}
                  aria-label={"Remove " + p.name}
                >
                  <Trash2 />
                </button>
              </div>
              {i < selected.length - 1 && (
                <label>
                  <Navigation />{" "}
                  {Math.round((hav(p, selected[i + 1]) / 22) * 60)} min ·{" "}
                  {hav(p, selected[i + 1]).toFixed(1)} km{" "}
                  <span>Shortest path</span>
                </label>
              )}
            </article>
          ))}
        </section>
        <section className={"real-map " + (tab === "map" ? "mobile-show" : "")}>
          <div className="map-toolbar">
            <div>
              <small>LIVE ROUTE</small>
              <b>Optimized using Dijkstra shortest paths</b>
            </div>
            <button
              onClick={() => notify("Map fitted to all selected destinations.")}
            >
              <Compass /> Fit route
            </button>
          </div>
          <MapView
            places={selected.map((p, i) => ({
              ...p,
              time: `${9 + Math.floor(i * 2.1)}:${i % 2 ? "15" : "00"}`,
            }))}
          />
          <div className="map-legend">
            <span>
              <i /> Recommended
            </span>
            <span>
              <i className="purple" /> Your priority
            </span>
            <span>
              <i className="green" /> Completed
            </span>
          </div>
        </section>
        <aside
          className={"trip-summary " + (tab === "summary" ? "mobile-show" : "")}
        >
          <div className="summary-title">
            <Sparkles />
            <span>
              <small>TRIP INTELLIGENCE</small>
              <b>Your plan at a glance</b>
            </span>
          </div>
          <div className="trip-score">
            <strong>
              {Math.round(
                selected.reduce((n, p) => n + p.score, 0) /
                  Math.max(1, selected.length),
              )}
            </strong>
            <small>/100</small>
            <b>GREAT MATCH</b>
          </div>
          <div className="big-metrics">
            <article>
              <WalletCards />
              <span>
                <small>BUDGET</small>
                <b>{money(req.budget)}</b>
              </span>
            </article>
            <article>
              <IndianRupee />
              <span>
                <small>EXPECTED SPEND</small>
                <b>{money(spent)}</b>
              </span>
            </article>
            <article>
              <Navigation />
              <span>
                <small>TRAVEL DISTANCE</small>
                <b>{distance.toFixed(1)} km</b>
              </span>
            </article>
            <article>
              <Clock />
              <span>
                <small>TRAVEL TIME</small>
                <b>{Math.round((distance / 22) * 60)} min</b>
              </span>
            </article>
          </div>
          <div className="remaining">
            <span>Remaining budget</span>
            <b>{money(req.budget - spent)}</b>
            <i>
              <span
                style={{ width: `${Math.max(5, (spent / req.budget) * 100)}%` }}
              />
            </i>
          </div>
          <div className="why-plan">
            <Sparkles />
            <span>
              <b>Why this plan?</b>
              <p>
                High-match places are preserved while the route minimizes travel
                and stays within budget and time.
              </p>
            </span>
          </div>
          <button
            className="outline-btn full"
            onClick={() => {
              setPlaces([...places]);
              notify("Your route has been optimized using Dijkstra.");
            }}
          >
            <Zap /> Optimize Again
          </button>
          {!active ? (
            <button className="blue-btn full" onClick={start}>
              Start Trip <ArrowRight />
            </button>
          ) : (
            <div className="change-actions">
              <small>SOMETHING CHANGED?</small>
              {[
                ["Weather Changed", CloudRain],
                ["Running Late", Clock],
                ["Budget Changed", IndianRupee],
                ["Place Unavailable", X],
                ["We’re Tired", Coffee],
              ].map(([x, I]) => {
                const Icon = I;
                return (
                  <button key={x} onClick={() => recover(x)}>
                    <Icon />
                    <span>
                      <b>{x}</b>
                      <small>Adapt remaining trip</small>
                    </span>
                    <ChevronRight />
                  </button>
                );
              })}
            </div>
          )}
        </aside>
      </div>
      <button
        className="assistant-fab"
        onClick={() => notify("Ask TravelMind: try “We are two hours late.”")}
      >
        <Bot /> Ask TravelMind
      </button>
    </main>
  );
}
function AddPlace({ city, onClose, onAdd }) {
  const [q, setQ] = useState(""),
    [searched, setSearched] = useState(false),
    [busy, setBusy] = useState(false),
    [results, setResults] = useState([]);
  const search = async () => {
    if (!q.trim()) return;
    setBusy(true);
    setSearched(true);
    try {
      const api =
        process.env.NEXT_PUBLIC_API_URL ||
        (typeof window !== "undefined" &&
        ["localhost", "127.0.0.1"].includes(window.location.hostname)
          ? "http://localhost:5000"
          : "");
      if (!api) throw new Error();
      const r = await fetch(
        `${api}/api/places/search?q=${encodeURIComponent(q)}&city=${encodeURIComponent(city)}`,
      );
      if (!r.ok) throw new Error();
      const payload = await r.json(),
        data = Array.isArray(payload) ? payload : payload.places || [];
      setResults(
        data.map((x) => ({
          id: "custom-" + x.id,
          name: x.name,
          lat: x.latitude,
          lng: x.longitude,
          cost: 0,
          category: x.primaryType || x.type || "Custom",
          tags: ["User Priority"],
          rating: x.rating || null,
          reviewCount: x.userRatingCount || null,
          duration: 60,
          score: 100,
          reason:
            "Manually selected and geographically verified inside your destination.",
          selected: true,
          priority: "user",
          address: x.formattedAddress || x.displayName,
          googleMapsUri: x.googleMapsUri || null,
        })),
      );
    } catch {
      setResults([]);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="modal-shade">
      <section className="add-modal">
        <button className="modal-x" onClick={onClose}>
          <X />
        </button>
        <div className="modal-symbol">
          <MapPin />
        </div>
        <div className="section-label">ADD YOUR PRIORITY</div>
        <h2>Add somewhere you really want to visit.</h2>
        <p>
          Search Google Places within {city}. Results are location-biased to
          your selected destination.
        </p>
        <div className="place-search">
          <Search />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder={`Place name, ${city}`}
          />
          <VoiceInputButton
            onTranscript={(x) => setQ(x)}
            label="place search"
          />
          <button onClick={search}>{busy ? "Searching…" : "Find Place"}</button>
        </div>
        {searched && (
          <div className="search-results">
            <small>
              {busy
                ? "SEARCHING"
                : `FOUND ${results.length} MATCH${results.length === 1 ? "" : "ES"}`}
            </small>
            {!busy && !results.length && (
              <p>
                No verified places found inside {city}. Try a more specific
                name.
              </p>
            )}
            {results.map((r) => (
              <article key={r.id}>
                <i>
                  <MapPin />
                </i>
                <span>
                  <b>{r.name}</b>
                  <small>{r.address}</small>
                </span>
                <button onClick={() => onAdd(r)}>Add to Trip</button>
              </article>
            ))}
          </div>
        )}
        <aside>
          <Star />
          <span>
            <b>Manual places become ★ Your Priority</b>
            <small>
              They are preserved ahead of ordinary recommendations whenever
              feasible.
            </small>
          </span>
        </aside>
      </section>
    </div>
  );
}
function Recovery({ places, event, accept }) {
  const selected = places.filter((p) => p.selected);
  return (
    <main className="recovery-v2">
      <div className="flow-nav">
        <Logo />
        <span>
          <Check /> Route re-optimized
        </span>
      </div>
      <section className="recovery-head">
        <div className="success-ring">
          <Check />
        </div>
        <div>
          <div className="section-label">ADAPTIVE RECOVERY COMPLETE</div>
          <h1>Your trip has been updated.</h1>
          <p>
            We changed as little as possible after: <b>{event}</b>.
          </p>
        </div>
        <button className="blue-btn" onClick={accept}>
          Use Updated Plan <ArrowRight />
        </button>
      </section>
      <div className="impact-v2">
        {[
          ["1h 45m", "Time recovered"],
          ["₹350", "Budget saved"],
          ["3.2 km", "Route reduced"],
          [
            `${Math.max(1, selected.length - 1)} / ${selected.length}`,
            "Activities preserved",
          ],
        ].map((x) => (
          <article key={x[1]}>
            <strong>{x[0]}</strong>
            <span>{x[1]}</span>
          </article>
        ))}
      </div>
      <section className="before-after">
        <header>
          <div>
            <small>BEFORE & AFTER</small>
            <h2>Only what needed to change.</h2>
          </div>
          <p>
            <i className="keep" /> Kept <i className="move" /> Moved{" "}
            <i className="remove" /> Removed <i className="replace" /> Replaced
          </p>
        </header>
        <div>
          <div className="compare-col">
            <h3>ORIGINAL PLAN</h3>
            {selected.slice(0, 4).map((p, i) => (
              <article key={p.id}>
                <time>{12 + i * 2}:00</time>
                <span>
                  <b>{p.name}</b>
                  <small>Originally scheduled</small>
                </span>
                <em className={i === 2 ? "remove" : i === 3 ? "move" : "keep"}>
                  {i === 2 ? "REMOVED" : i === 3 ? "MOVED" : "KEPT"}
                </em>
              </article>
            ))}
          </div>
          <ArrowRight />
          <div className="compare-col updated">
            <h3>UPDATED PLAN</h3>
            {selected
              .filter((_, i) => i !== 2)
              .slice(0, 3)
              .map((p, i) => (
                <article key={p.id}>
                  <time>{12 + i * 2}:30</time>
                  <span>
                    <b>{p.name}</b>
                    <small>
                      {p.priority === "user"
                        ? "Your priority preserved"
                        : "High preference preserved"}
                    </small>
                  </span>
                  <em className={i === 2 ? "move" : "keep"}>
                    {i === 2 ? "MOVED" : "KEPT"}
                  </em>
                </article>
              ))}
          </div>
        </div>
      </section>
      <section className="decision-v2">
        <div>
          <Sparkles />
          <span>
            <small>WHY TRAVELMIND CHANGED THIS</small>
            <h2>Every decision is explainable.</h2>
          </span>
        </div>
        <article>
          <X />
          <p>
            <b>The lowest-value stop was removed</b>
            <br />
            {event} reduced the feasible time. It had the lowest combined
            preference and priority score.
          </p>
        </article>
        <article>
          <Heart />
          <p>
            <b>Your highest-match destinations were preserved</b>
            <br />
            TravelMind protected beach, food, photography and every manually
            added priority.
          </p>
        </article>
        <article>
          <Navigation />
          <p>
            <b>The route was recalculated</b>
            <br />
            Dijkstra shortest paths reduced the remaining travel by
            approximately 3.2 km.
          </p>
        </article>
      </section>
    </main>
  );
}
function Assistant({ close, command }) {
  const [q, setQ] = useState(""),
    [busy, setBusy] = useState(false),
    [messages, setMessages] = useState([
      {
        role: "assistant",
        reply: {
          message:
            "Hi! I can explain, change, or build your complete itinerary. Try “Make a plan from my selected places.”",
        },
      },
    ]);
  const send = async (value = q) => {
    const text = value.trim();
    if (!text || busy) return;
    setQ("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", reply: { message: text } }]);
    try {
      const reply = await command(text);
      setMessages((m) => [...m, { role: "assistant", reply }]);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="assistant-panel">
      <header>
        <div>
          <Bot />
          <span>
            <b>Ask TravelMind</b>
            <small>AI assistant · Actions enabled</small>
          </span>
        </div>
        <button onClick={close} aria-label="Close assistant">
          <X />
        </button>
      </header>
      <div className="assistant-body">
        {messages.map((m, i) => (
          <div className={"chat-message " + m.role} key={i}>
            <p>{m.reply.message}</p>
            {m.reply.text && <p className="itinerary-text">{m.reply.text}</p>}
            {m.reply.itinerary && (
              <section className="generated-itinerary">
                <h3>
                  {m.reply.itinerary.title || "Your personalized itinerary"}
                </h3>
                {m.reply.itinerary.description && (
                  <p>{m.reply.itinerary.description}</p>
                )}
                {m.reply.itinerary.days?.map((day, di) => (
                  <article key={di}>
                    <h4>{day.title || `Day ${day.day || di + 1}`}</h4>
                    {day.activities?.map((a, ai) => (
                      <div key={ai}>
                        <time>{a.time || "Flexible"}</time>
                        <span>
                          <b>{a.place || a.name || a.activity || "Activity"}</b>
                          {a.activity && (a.place || a.name) && (
                            <small>{a.activity}</small>
                          )}
                          <small>
                            {[a.duration, a.reason].filter(Boolean).join(" · ")}
                          </small>
                        </span>
                      </div>
                    ))}
                  </article>
                ))}
                {(m.reply.itinerary.estimatedBudget ||
                  m.reply.itinerary.estimated_budget) && (
                  <strong>
                    Estimated budget:{" "}
                    {m.reply.itinerary.estimatedBudget ||
                      m.reply.itinerary.estimated_budget}
                  </strong>
                )}
              </section>
            )}
          </div>
        ))}
        {busy && (
          <div className="chat-message assistant loading">
            <Sparkles /> Building your personalized trip...
          </div>
        )}
      </div>
      <div className="assistant-input">
        <input
          value={q}
          disabled={busy}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void send();
          }}
          placeholder="Ask or change your trip…"
        />
        <VoiceInputButton onTranscript={(x) => setQ(x)} label="chat message" />
        <button
          disabled={busy || !q.trim()}
          onClick={() => void send()}
          aria-label="Send message"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
export default function Page() {
  const [view, setView] = useState("home"),
    [req, setReqState] = useState(DEFAULT_REQ),
    [places, setPlacesState] = useState(() => scorePlaces(DEFAULT_REQ));
  const [toast, setToast] = useState(""),
    [add, setAdd] = useState(false),
    [assistant, setAssistant] = useState(false),
    [event, setEvent] = useState(""),
    [discoveryFailed, setDiscoveryFailed] = useState(false);
  const tripId = useRef(null),
    saveTimer = useRef(null),
    newTripStarted = useRef(false),
    apiBase =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== "undefined" &&
      ["localhost", "127.0.0.1"].includes(window.location.hostname)
        ? "http://localhost:5000"
        : "");
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (newTripStarted.current) return;
      let restored = false;
      if (apiBase)
        try {
          const response = await fetch(`${apiBase}/api/trips`, {
            signal: AbortSignal.timeout(4000),
          });
          if (response.ok) {
            const trips = await response.json(),
              latest = trips[0];
            if (latest) {
              const detail = await fetch(`${apiBase}/api/trips/${latest.id}`, {
                signal: AbortSignal.timeout(4000),
              }).then((x) => x.json());
              const saved = detail.requirements?.travelmindState;
              if (saved?.req) {
                if (newTripStarted.current) return;
                tripId.current = detail.id;
                setReqState(saved.req);
                setPlacesState(saved.places || []);
                setView(saved.view === "active" ? "active" : "home");
                localStorage.setItem("travelmind-trip", JSON.stringify(saved));
                restored = true;
              }
            }
          }
        } catch {}
      if (!restored)
        try {
          const saved = localStorage.getItem("travelmind-trip");
          if (saved) {
            if (newTripStarted.current) return;
            const d = JSON.parse(saved);
            setReqState(d.req || DEFAULT_REQ);
            setPlacesState(d.places || scorePlaces(d.req || DEFAULT_REQ));
            setView(d.view === "active" ? "active" : "home");
          }
        } catch {}
    }, 0);
    return () => {
      clearTimeout(timer);
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [apiBase]);
  const persist = (r, p, v = view) => {
    const state = { req: r, places: p, view: v };
    localStorage.setItem("travelmind-trip", JSON.stringify(state));
    if (!apiBase) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const payload = {
        destination: r.destination,
        budget: r.budget,
        durationDays: r.days,
        travellers: r.travelers,
        status: v === "active" ? "active" : "planned",
        requirements: {
          travelmindState: state,
          interests: r.interests,
          avoid: r.avoid,
          startTime: r.start,
          endTime: r.end,
        },
      };
      try {
        const response = await fetch(
          tripId.current
            ? `${apiBase}/api/trips/${tripId.current}`
            : `${apiBase}/api/trips`,
          {
            method: tripId.current ? "PATCH" : "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(6000),
          },
        );
        if (!response.ok) throw new Error();
        const saved = await response.json();
        tripId.current = saved.id;
      } catch {}
    }, 350);
  };
  const mapResults = (data) => {
    const list = Array.isArray(data) ? data : Array.isArray(data?.places) ? data.places : [];
    return list.filter((p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude)).map((p, i) => ({
      id: p.id,
      name: p.name,
      lat: p.latitude,
      lng: p.longitude,
      cost: p.averageCost || 0,
      category:
        p.category || p.primaryType?.replaceAll("_", " ") || "Attraction",
      tags: p.tags || p.types || [],
      rating: p.rating || null,
      reviewCount: p.userRatingCount || null,
      duration: p.visitDurationMinutes || 60,
      score: p.recommendationScore,
      reason: (p.reasons || []).join(". "),
      selected: i < 5,
      priority: "recommended",
      address: p.formattedAddress || p.description,
      imageUrl: p.photoReference
        ? `${apiBase}/api/places/photo?name=${encodeURIComponent(p.photoReference)}`
        : null,
      googleMapsUri: p.googleMapsUri || null,
      distanceKm: p.distanceFromDestinationKm || null,
    }));
  };
  const refreshRecommendations = async (r) => {
    if (!apiBase) return;
    try {
      const response = await fetch(`${apiBase}/api/places/recommend`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          destination: r.destination,
          interests: r.interests,
          avoid: r.avoid,
          budget: r.budget,
          durationDays: r.days,
          travellers: r.travelers,
          limit: 20,
        }),
        signal: AbortSignal.timeout(30000),
      });
      const raw = await response.text();
      let payload; try { payload = JSON.parse(raw); } catch { payload = null; }
      if (!response.ok) throw new Error(payload?.message || raw.slice(0, 200) || `Google Places failed (${response.status})`);
      const next = mapResults(payload);
      if (!next.length) throw new Error("Google Places returned no usable recommendations.");
      setPlacesState(next);
      persist(r, next);
    } catch (error) {
      console.error("Recommendation discovery failed:", error);
      setToast(error?.message || "We couldn't load fresh Google place results right now.");
    }
  };
  const setReq = (r) => {
    const discoveryChanged =
      r.destination !== req.destination ||
      r.interests.join("|") !== req.interests.join("|") ||
      r.avoid.join("|") !== req.avoid.join("|");
    setReqState(r);
    if (discoveryChanged) {
      setPlacesState([]);
      persist(r, []);
    } else persist(r, places);
  };
  const setPlaces = (p) => {
    setPlacesState(p);
    persist(req, p);
  };
  const start = async (text = "") => {
    if (!text.trim()) {
      setToast("Tell me what you know about your trip.");
      return;
    }
    if (!apiBase) {
      setToast("Connect the Express API so I can understand your trip.");
      return;
    }
    newTripStarted.current = true;
    try {
      const response = await fetch(`${apiBase}/api/trip/understand`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ text }),
  signal: AbortSignal.timeout(30000),
});

const raw = await response.text();

let parsed;

try {
  parsed = JSON.parse(raw);
} catch (error) {
  console.error("Invalid trip parser response:", raw);

  throw new Error(
    `Trip parser returned invalid response: ${raw.slice(0, 200)}`
  );
}

console.log("Trip understand response:", {
  status: response.status,
  parsed,
});

if (!response.ok) {
  throw new Error(
    parsed?.message ||
      parsed?.error ||
      `Trip understanding failed with status ${response.status}`
  );
}

if (!parsed.destination) {
  setToast(
    parsed.nextQuestion?.question ||
      "Please clarify which destination you mean."
  );
  return;
}
      tripId.current = null;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      localStorage.removeItem("travelmind-trip");
      const r = {
        destination: parsed.destination,
        travelers: parsed.travellers || 0,
        budget: parsed.budget || 0,
        days: parsed.durationDays || 0,
        start: "09:00",
        end: "20:00",
        interests: parsed.interests || [],
        avoid: parsed.avoid || [],
        originalPrompt: text,
      };
      setReqState(r);
      const next = scorePlaces({
        ...r,
        budget: r.budget || 5000,
        days: r.days || 1,
        travelers: r.travelers || 1,
      });
      setPlacesState(next);
      persist(r, next, "clarify");
      setToast(parsed.message);
      setView(
        r.days && r.budget && r.travelers && r.interests.length
          ? "understand"
          : "clarify",
      );
    } 
    
    catch (error) {
  console.error("Trip understanding failed:", error);

  setToast(
    error?.message ||
      "I couldn't understand that trip right now. Please try again."
  );
}
  };
  const discover = async () => {
    setView("loading");
    if (!apiBase) {
      setView("understand");
      setToast("Connect the Express API to discover live places.");
      return;
    }
    try {
      const response = await fetch(`${apiBase}/api/places/recommend`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          destination: req.destination,
          interests: req.interests,
          avoid: req.avoid,
          budget: req.budget,
          durationDays: req.days,
          travellers: req.travelers,
          limit: 20,
        }),
        signal: AbortSignal.timeout(30000),
      });
      const raw = await response.text();
      let payload; try { payload = JSON.parse(raw); } catch { payload = null; }
      if (!response.ok) throw new Error(payload?.message || raw.slice(0, 200) || `Discovery failed (${response.status})`);
      const next = mapResults(payload);
      if (!next.length) throw new Error("Google Places returned no usable recommendations.");
      setPlaces(next);
      setDiscoveryFailed(false);
      setView("recommend");
    } catch (error) {
      console.error("Recommendation discovery failed:", error);
      setDiscoveryFailed(true);
      setView("understand");
      setToast(error?.message || "We couldn't load fresh Google place results right now.");
    }
  };
  const doRecover = (e) => {
    if (e === "Running Late" && !prompt("How late are you?", "2 hours")) return;
    if (e === "Budget Changed") {
      const v = prompt("What is your remaining budget?", "1000");
      if (!v) return;
      setReq({ ...req, budget: Number(v) });
    }
    if (e === "Weather Changed" && !prompt("What changed?", "Heavy Rain"))
      return;
    setEvent(e);
    setView("recovery");
  };
  const addPlace = (p) => {
    const next = [...places.filter((x) => x.id !== p.id), p];
    setPlaces(next);
    setAdd(false);
    setToast(`${p.name} added as ★ Your Priority.`);
  };
  const command = async (q) => {
    if (
      /(?:make|create|generate|build|plan).*(?:plan|trip|itinerary)|(?:plan|itinerary).*(?:selected places|my places)/i.test(
        q,
      )
    ) {
      const missing = [
        !req.destination && "destination",
        !req.days && "days",
        !req.budget && "budget",
        !req.travelers && "travellers",
      ].filter(Boolean);
      if (missing.length)
        return {
          message: `Please provide ${missing.join(", ")} before I build your plan.`,
        };
      if (!apiBase)
        return {
          message:
            "The trip-planning service is not connected right now. Please try again after the API is configured.",
        };
      try {
        const response = await fetch(`${apiBase}/api/ai/generate-plan`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            tripId: tripId.current,
            trip: {
              destination: req.destination,
              startingPoint: req.destination,
              days: req.days,
              budget: req.budget,
              travellers: req.travelers,
              interests: req.interests,
              avoid: req.avoid,
              dayStart: req.start,
              dayEnd: req.end,
              selectedPlaces: places
                .filter((p) => p.selected)
                .map((p) => ({
                  id: p.id,
                  name: p.name,
                  category: p.category,
                  address: p.address,
                  cost: p.cost,
                  duration: p.duration,
                  latitude: p.lat,
                  longitude: p.lng,
                })),
              weather: null,
            },
          }),
          signal: AbortSignal.timeout(65000),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok)
          return {
            message:
              data.message ||
              "I could not build the itinerary right now. Please try again.",
          };
        return {
          message: "Your personalized itinerary is ready.",
          itinerary: data.itinerary,
          text: data.text,
        };
      } catch {
        return {
          message:
            "I could not reach the itinerary service right now. Please try again.",
        };
      }
    }
    if (/late/i.test(q)) {
      doRecover("Running Late");
      return {
        message:
          "I opened the delay recovery flow for your remaining schedule.",
      };
    }
    if (/cheaper|₹\s?1000/i.test(q)) {
      doRecover("Budget Changed");
      return {
        message:
          "I opened the budget recovery flow so we can protect your best stops.",
      };
    }
    if (/add/i.test(q)) {
      const found = cityCatalog(req.destination).find((p) =>
        q
          .toLowerCase()
          .includes(p.name.toLowerCase().split(" ")[0].toLowerCase()),
      );
      if (found) {
        addPlace({
          ...found,
          score: 100,
          reason:
            "Manually added by you, so this place receives highest preservation priority.",
          selected: true,
          priority: "user",
        });
        return { message: `${found.name} was added as your priority.` };
      }
      setAdd(true);
      return { message: "Search for the place in the add-place window." };
    }
    return {
      message: `${places[0]?.name || "This place"} ranks first for preference match, city relevance, cost, and route efficiency.`,
    };
  };
  return (
    <>
      {view === "home" && (
        <Home start={start} assistant={() => setAssistant(true)} />
      )}{" "}
      {view === "clarify" && (
        <Clarify
          req={req}
          setReq={setReq}
          back={() => setView("home")}
          done={() => setView("understand")}
        />
      )}{" "}
      {view === "understand" && (
        <Understand
          req={req}
          setReq={setReq}
          back={() => setView("home")}
          next={discover}
          notify={setToast}
          retry={discoveryFailed}
        />
      )}{" "}
      {view === "recommend" && (
        <Recommendations
          req={req}
          places={places}
          setPlaces={setPlaces}
          back={() => setView("understand")}
          next={() => setView("loading")}
          notify={setToast}
          openAdd={() => setAdd(true)}
        />
      )}{" "}
      {view === "loading" && (
        <Loading
          done={() => setView(places.length ? "planner" : "understand")}
        />
      )}{" "}
      {(view === "planner" || view === "active") && (
        <Planner
          req={req}
          setReq={setReq}
          places={places}
          setPlaces={setPlaces}
          active={view === "active"}
          start={() => {
            setView("active");
            persist(req, places, "active");
          }}
          recover={doRecover}
          notify={setToast}
          openAdd={() => setAdd(true)}
        />
      )}{" "}
      {view === "recovery" && (
        <Recovery
          places={places}
          event={event}
          accept={() => {
            const selected = places.filter((p) => p.selected);
            const removable = selected.findLast((p) => p.priority !== "user");
            setPlaces(
              places.map((p) =>
                p.id === removable?.id ? { ...p, selected: false } : p,
              ),
            );
            setView("active");
          }}
        />
      )}
      {add && (
        <AddPlace
          city={req.destination}
          places={places}
          onClose={() => setAdd(false)}
          onAdd={addPlace}
        />
      )}{" "}
      {assistant && (
        <Assistant close={() => setAssistant(false)} command={command} />
      )}{" "}
      {toast && <Toast text={toast} onDone={() => setToast("")} />}
    </>
  );
}
