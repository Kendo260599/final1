import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider
from matplotlib.patches import FancyArrowPatch


def draw_compass(ax):
    """Vẽ nền la bàn với các vạch chia và chữ hướng."""
    for r in np.linspace(0, 1, 200):
        ax.add_patch(plt.Circle((0, 0), r, color=plt.cm.Blues(0.2 + 0.8 * r), alpha=0.6))

    ax.add_patch(plt.Circle((0, 0), 1, edgecolor='black', facecolor='none', linewidth=2))

    for deg in range(0, 360, 5):
        angle = np.radians(deg)
        outer = 1
        inner = 0.86 if deg % 30 == 0 else 0.92
        lw = 2.5 if deg % 30 == 0 else 1
        ax.plot([inner * np.cos(angle), outer * np.cos(angle)],
                [inner * np.sin(angle), outer * np.sin(angle)],
                color='black', linewidth=lw)

    directions = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    for d, (x, y) in directions.items():
        ax.text(1.12 * x, 1.12 * y, d, ha='center', va='center',
                fontsize=20, fontweight='bold', color='crimson')

    sub_dirs = {'NE': (np.sqrt(2)/2, np.sqrt(2)/2),
                'SE': (np.sqrt(2)/2, -np.sqrt(2)/2),
                'SW': (-np.sqrt(2)/2, -np.sqrt(2)/2),
                'NW': (-np.sqrt(2)/2,  np.sqrt(2)/2)}
    for d, (x, y) in sub_dirs.items():
        ax.text(1.08 * x, 1.08 * y, d, ha='center', va='center',
                fontsize=14, color='darkblue')

    for deg in range(0, 360, 30):
        angle = np.radians(deg)
        ax.text(0.75 * np.cos(angle), 0.75 * np.sin(angle),
                f"{deg}\u00b0", ha='center', va='center', fontsize=10)

    ax.set_aspect('equal', adjustable='box')
    ax.set_xlim(-1.25, 1.25)
    ax.set_ylim(-1.25, 1.25)
    ax.axis('off')


def make_arrow(angle_deg):
    """Tạo hai mũi tên chỉ hướng Bắc và Nam."""
    ang = np.radians(angle_deg)
    x, y = np.sin(ang), np.cos(ang)
    arrow_n = FancyArrowPatch((0, 0), (x * 0.8, y * 0.8),
                              arrowstyle="simple", color="red",
                              mutation_scale=20, linewidth=2)
    arrow_s = FancyArrowPatch((0, 0), (-x * 0.8, -y * 0.8),
                              arrowstyle="simple", color="navy",
                              mutation_scale=20, linewidth=2)
    return arrow_n, arrow_s


def main():
    fig, ax = plt.subplots(figsize=(6, 6))
    plt.subplots_adjust(bottom=0.15)
    draw_compass(ax)

    arrow_n, arrow_s = make_arrow(0)
    ax.add_patch(arrow_n)
    ax.add_patch(arrow_s)

    ax_slider = plt.axes([0.25, 0.05, 0.5, 0.03])
    slider = Slider(ax_slider, 'Góc', 0, 360, valinit=0)
    heading_text = ax.text(0, -1.1, "0\u00b0", ha="center", va="center", fontsize=14)

    def update(val):
        nonlocal arrow_n, arrow_s, heading_text
        arrow_n.remove()
        arrow_s.remove()
        arrow_n, arrow_s = make_arrow(slider.val)
        ax.add_patch(arrow_n)
        ax.add_patch(arrow_s)
        heading_text.set_text(f"{slider.val:.0f}\u00b0")
        fig.canvas.draw_idle()

    slider.on_changed(update)
    plt.show()


if __name__ == "__main__":
    main()␊

