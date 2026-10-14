import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import {
  PROJECTS,
  MATERIALS,
  VIEWPOINTS,
  CHAPTERS,
  JOURNAL_ENTRIES,
  cn,
} from "./lib/utils";

describe("AETHER — Architecture Beyond Earth", () => {
  it("renders the primary brand mark, chapter navigation, and dismisses the prelude", () => {
    render(<App />);

    // Brand marks
    const brandMarks = screen.getAllByText("AETHER");
    expect(brandMarks.length).toBeGreaterThan(0);

    // Dismiss the prelude
    const enterBtn = screen.getByRole("button", { name: /enter immediately/i });
    expect(enterBtn).toBeInTheDocument();
    fireEvent.click(enterBtn);

    // Navigation links in header
    expect(screen.getByRole("link", { name: /reveal/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /materiality/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /residences/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /interior/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /light study/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /atelier/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explorer/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /commissions/i })).toBeInTheDocument();
  });

  it("renders all signature architectural residences with structural telemetry", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /enter immediately/i }));

    // Chapter 04 signature residence codes
    expect(screen.getAllByText("AE—01").length).toBeGreaterThan(0);
    expect(screen.getAllByText("AE—02").length).toBeGreaterThan(0);
    expect(screen.getAllByText("AE—03").length).toBeGreaterThan(0);

    // Check project titles
    expect(screen.getAllByText("SOLACE").length).toBeGreaterThan(0);
    expect(screen.getAllByText("DUNE").length).toBeGreaterThan(0);
    expect(screen.getAllByText("VEIL").length).toBeGreaterThan(0);
  });

  it("renders the material palette swatches and allows interactive inspection", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /enter immediately/i }));

    const limestoneElements = screen.getAllByText("Honed Jura Limestone");
    expect(limestoneElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Low-Iron Structural Glass")).toBeInTheDocument();
    expect(screen.getByText("Brushed Champagne Titanium")).toBeInTheDocument();
    expect(screen.getByText("split Volcanic Basalt & Still Water")).toBeInTheDocument();

    // Click on titanium swatch
    const titaniumSwatch = screen.getByRole("button", {
      name: /MAT—03/i,
    });
    fireEvent.click(titaniumSwatch);
    expect(titaniumSwatch).toHaveAttribute("aria-pressed", "true");
  });

  it("renders interior viewpoints in Chapter 05 and updates active viewpoint", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /enter immediately/i }));

    const vp1Btn = screen.getByRole("button", {
      name: /VP—01/i,
    });
    expect(vp1Btn).toBeInTheDocument();
    expect(vp1Btn).toHaveAttribute("aria-pressed", "true");

    const vp2Btn = screen.getByRole("button", {
      name: /VP—02/i,
    });
    fireEvent.click(vp2Btn);
    expect(vp2Btn).toHaveAttribute("aria-pressed", "true");
  });

  it("validates private commission inquiry form and handles complete submission", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /enter immediately/i }));

    const submitBtn = screen.getByRole("button", {
      name: /transmit encrypted brief/i,
    });
    expect(submitBtn).toBeInTheDocument();

    // Submit empty to trigger validation
    fireEvent.click(submitBtn);

    expect(
      screen.getByText(/Please provide your name or family office designation/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please provide a valid private correspondence email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please share brief site topography/i)
    ).toBeInTheDocument();

    // Fill the form
    const nameInput = container.querySelector<HTMLInputElement>("#client-name")!;
    const emailInput = container.querySelector<HTMLInputElement>("#client-email")!;
    const notesInput = container.querySelector<HTMLTextAreaElement>("#client-notes")!;

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(notesInput).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: "Nordic Heritage Fund" } });
    fireEvent.change(emailInput, { target: { value: "partners@nordicheritage.is" } });
    fireEvent.change(notesInput, {
      target: { value: "South Iceland cliff parcel with 180m ocean frontage." },
    });

    fireEvent.click(submitBtn);

    // Verify confirmation
    expect(
      screen.getByText(/Inquiry Transmitted to Atelier Partners/i)
    ).toBeInTheDocument();
  });

  it("filters project explorer by landscape typology", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /enter immediately/i }));

    const desertFilterBtn = screen.getByRole("button", { name: /^desert$/i });
    expect(desertFilterBtn).toBeInTheDocument();

    fireEvent.click(desertFilterBtn);
    expect(desertFilterBtn).toHaveAttribute("aria-pressed", "true");

    // DUNE should still be present in the table
    expect(screen.getAllByText("DUNE").length).toBeGreaterThan(0);
  });

  it("allows opening and closing the project architectural dossier modal", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /enter immediately/i }));

    const inspectButtons = screen.getAllByRole("button", {
      name: /inspect dossier/i,
    });
    expect(inspectButtons.length).toBeGreaterThan(0);

    // Click the first dossier button
    fireEvent.click(inspectButtons[0]);

    // Modal opens
    const closeBtn = screen.getByRole("button", {
      name: /close project dossier/i,
    });
    expect(closeBtn).toBeInTheDocument();

    // Close the modal
    fireEvent.click(closeBtn);
    expect(
      screen.queryByRole("button", { name: /close project dossier/i })
    ).not.toBeInTheDocument();
  });

  it("toggles the audio state when sound button is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /enter immediately/i }));

    const soundBtn = screen.getByRole("button", {
      name: /ambient architectural sound/i,
    });
    expect(soundBtn).toBeInTheDocument();
    expect(soundBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(soundBtn);
    expect(soundBtn).toHaveAttribute("aria-pressed", "true");
  });
});

describe("AETHER Data & Utility Invariants", () => {
  it("maintains project specifications with valid telemetry", () => {
    expect(PROJECTS.length).toBe(3);
    for (const project of PROJECTS) {
      expect(project.slug).toBeDefined();
      expect(project.code).toMatch(/^AE—0[123]$/);
      expect(project.areaSqm).toBeGreaterThan(900);
      expect(project.cantileverM).toBeGreaterThanOrEqual(0);
      expect(project.coordinates).toBeDefined();
      expect(project.materialsUsed.length).toBeGreaterThan(0);
    }
  });

  it("maintains material swatch catalog with real physical attributes", () => {
    expect(MATERIALS.length).toBe(4);
    for (const mat of MATERIALS) {
      expect(mat.id).toBeDefined();
      expect(mat.code).toMatch(/^MAT—0[1-4]$/);
      expect(mat.name).toBeDefined();
      expect(mat.origin).toBeDefined();
      expect(mat.density).toBeDefined();
      expect(mat.reflectance).toBeGreaterThan(0);
      expect(mat.roughness).toBeGreaterThanOrEqual(0);
      expect(mat.finishNote).toBeDefined();
    }
  });

  it("maintains 4 interior viewpoints and 10 chapters", () => {
    expect(VIEWPOINTS.length).toBe(4);
    expect(CHAPTERS.length).toBe(10);
    expect(JOURNAL_ENTRIES.length).toBe(3);
  });

  it("merges CSS classes safely with cn()", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    expect(cn("p-4", "p-6")).toBe("p-6");
    expect(cn("text-red-500", false && "text-blue-500", "font-bold")).toBe(
      "text-red-500 font-bold"
    );
  });
});
