import {
  useState
} from "react";

import {
  Sparkles
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import "./CreateStory.css";


export default function CreateStory() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({

      hero_name: "",
      age: 7,

      theme:
        "Magical Forest Adventure",

      moral:
        "Kindness",

      language:
        "English",

      art_style:
        "storybook",

      character_description:
        "",

      pages: 6,

    });


  function update(
    field,
    value
  ) {

    setForm({
      ...form,
      [field]: value,
    });

  }


  function submit(
    event
  ) {

    event.preventDefault();

    if (!form.hero_name.trim()) {

      alert(
        "Please enter the child's name."
      );

      return;
    }

    sessionStorage.setItem(
      "kathaquest_story_request",
      JSON.stringify(form)
    );

    navigate(
      "/storybook"
    );

  }


  return (

    <div className="create-story-page">

      <div className="create-story-card">

        <div className="create-story-heading">

          <span>
            ✨ KATHAQUEST
          </span>

          <h1>
            Create a Living Story
          </h1>

          <p>
            Turn a child's idea into an
            illustrated and narrated adventure.
          </p>

        </div>


        <form
          onSubmit={submit}
          className="story-form"
        >

          <label>

            Child's Name

            <input
              value={form.hero_name}
              onChange={(e) =>
                update(
                  "hero_name",
                  e.target.value
                )
              }
              placeholder="Example: Aarav"
            />

          </label>


          <label>

            Age

            <select
              value={form.age}
              onChange={(e) =>
                update(
                  "age",
                  Number(e.target.value)
                )
              }
            >

              <option value="5">
                5 years
              </option>

              <option value="6">
                6 years
              </option>

              <option value="7">
                7 years
              </option>

              <option value="8">
                8 years
              </option>

              <option value="9">
                9 years
              </option>

              <option value="10">
                10 years
              </option>

              <option value="11">
                11 years
              </option>

              <option value="12">
                12 years
              </option>

            </select>

          </label>


          <label>

            Story Theme

            <input
              value={form.theme}
              onChange={(e) =>
                update(
                  "theme",
                  e.target.value
                )
              }
              placeholder="Space adventure, jungle, ocean..."
            />

          </label>


          <label>

            Moral Lesson

            <select
              value={form.moral}
              onChange={(e) =>
                update(
                  "moral",
                  e.target.value
                )
              }
            >

              <option>
                Kindness
              </option>

              <option>
                Sharing
              </option>

              <option>
                Honesty
              </option>

              <option>
                Courage
              </option>

              <option>
                Patience
              </option>

              <option>
                Teamwork
              </option>

              <option>
                Respect
              </option>

            </select>

          </label>


          <label>

            Language

            <select
              value={form.language}
              onChange={(e) =>
                update(
                  "language",
                  e.target.value
                )
              }
            >

              <option>
                English
              </option>

              <option>
                Telugu
              </option>

              <option>
                Hindi
              </option>

              <option>
                Tamil
              </option>

              <option>
                Kannada
              </option>

            </select>

          </label>


          <label>

            Art Style

            <select
              value={form.art_style}
              onChange={(e) =>
                update(
                  "art_style",
                  e.target.value
                )
              }
            >

              <option value="storybook">
                Classic Storybook
              </option>

              <option value="watercolor">
                Watercolor
              </option>

              <option value="cartoon">
                Cartoon
              </option>

              <option value="cinematic realistic">
                Cinematic Realistic
              </option>

            </select>

          </label>


          <label>

            Character Appearance

            <textarea
              value={
                form.character_description
              }
              onChange={(e) =>
                update(
                  "character_description",
                  e.target.value
                )
              }
              placeholder="Example: black curly hair, blue jacket, red backpack..."
            />

          </label>


          <label>

            Number of Pages

            <select
              value={form.pages}
              onChange={(e) =>
                update(
                  "pages",
                  Number(e.target.value)
                )
              }
            >

              <option value="5">
                5 Pages
              </option>

              <option value="6">
                6 Pages
              </option>

              <option value="7">
                7 Pages
              </option>

              <option value="8">
                8 Pages
              </option>

            </select>

          </label>


          <button
            type="submit"
            className="generate-story-button"
          >

            <Sparkles size={20} />

            Generate My Story

          </button>

        </form>

      </div>

    </div>
  );
}