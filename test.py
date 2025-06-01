# import matplotlib.pyplot as plt
# import matplotlib.patches as patches

# # Create figure and axis
# fig, ax = plt.subplots(figsize=(8, 12))
# ax.axis('off')

# # Define flowchart steps and positions
# steps = [
#     ("Substrate Preparation", (0.1, 0.9)),
#     ("Sterilization / Pasteurization", (0.1, 0.8)),
#     ("Inoculation with Spawn", (0.1, 0.7)),
#     ("Incubation (Mycelium Colonization)", (0.1, 0.6)),
#     ("Fruit Induction\n(Adjust T, RH, Light, CO₂)", (0.1, 0.5)),
#     ("Fruiting & Growth", (0.1, 0.4)),
#     ("Harvesting", (0.1, 0.3)),
#     ("Post-Harvest Handling\n(Cleaning, Sorting)", (0.1, 0.2)),
#     ("Packaging", (0.1, 0.1)),
#     ("Distribution & Selling", (0.1, 0.0))
# ]

# # Draw boxes and text
# box_height = 0.08
# box_width = 0.8

# for text, (x, y) in steps:
#     rect = patches.Rectangle((x, y - box_height/2), box_width, box_height, 
#                              edgecolor='black', facecolor='lightgray')
#     ax.add_patch(rect)
#     ax.text(x + box_width/2, y, text, ha='center', va='center', fontsize=10, wrap=True)

# # Draw arrows between boxes
# for i in range(len(steps) - 1):
#     x1, y1 = steps[i][1]
#     x2, y2 = steps[i + 1][1]
#     ax.annotate(
#         '', 
#         xy=(0.5, y2 + box_height/2), 
#         xytext=(0.5, y1 - box_height/2), 
#         arrowprops=dict(arrowstyle='->', lw=1.5)
#     )

# plt.tight_layout()
# plt.show()

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.lines import Line2D

# Create a figure
fig, ax = plt.subplots(figsize=(10, 18))
ax.axis('off')

# Define box properties
box_props = dict(facecolor='lightgray', edgecolor='black')
text_props = dict(ha='left', va='center', fontsize=9)

# Y positions for each section
y_positions = {
    "Raw Materials": 17,
    "Spawn Production": 14,
    "Substrate Preparation": 11,
    "Sterilization": 9.5,
    "Inoculation": 8,
    "Incubation": 6.5,
    "Fruit Induction": 5.5,
    "Fruiting": 4.5,
    "Harvesting": 3.5,
    "Post-Harvest": 2.5,
    "Packaging": 1.5,
    "Distribution & Sales": 0.5
}

# Draw section titles
sections = [
    "Raw Materials Sourcing",
    "Spawn Production",
    "Substrate Preparation",
    "Sterilization",
    "Inoculation",
    "Incubation (Mycelium Growth)",
    "Fruit Induction",
    "Fruiting & Growth",
    "Harvesting",
    "Post-Harvest Handling",
    "Packaging",
    "Distribution & Sales"
]

for idx, section in enumerate(sections):
    y = 18 - idx * 1.5
    ax.text(0.02, y + 0.3, section, fontweight='bold', fontsize=10, va='center')

# Draw detailed boxes for each stage
# Raw Materials
ax.add_patch(patches.Rectangle((0.05, 16.5), 0.9, 0.8, **box_props))
ax.text(0.07, 16.9, "- Source Agricultural Waste (straw, sawdust)\n- Procure Supplements (bran, lime)\n- Water & Utilities Setup", **text_props)

# Spawn Production
ax.add_patch(patches.Rectangle((0.05, 13.5), 0.9, 1.8, **box_props))
ax.text(0.07, 15, "- Maintain Mother Culture (Pure Strain)\n- Prepare Grain/Medium\n- Sterilize Grain (Autoclave)\n- Inoculate Grain with Culture\n- Incubate Spawn Bags (25°C, 85% RH)", **text_props)

# Substrate Preparation
ax.add_patch(patches.Rectangle((0.05, 10.5), 0.9, 1.6, **box_props))
ax.text(0.07, 11.3, "- Chop & Mix Substrate (Straw/Sawdust)\n- Adjust Moisture (60-65%)\n- Adjust pH (5.5-6.5) with Lime\n- Add Supplement (Bran)", **text_props)

# Sterilization
ax.add_patch(patches.Rectangle((0.05, 9), 0.9, 1.0, **box_props))
ax.text(0.07, 9.4, "- Pack Substrate into Bags\n- Sterilize/Pasteurize (Steam or Autoclave)\n- Cool to Room Temperature", **text_props)

# Inoculation
ax.add_patch(patches.Rectangle((0.05, 7.5), 0.9, 1.0, **box_props))
ax.text(0.07, 7.9, "- Under Clean Environment (Laminar Flow):\n  • Open Sterile Bags\n  • Add Spawn (3-5% w/w)\n  • Seal Bags\n- Label & Date", **text_props)

# Incubation (Mycelium Growth)
ax.add_patch(patches.Rectangle((0.05, 6), 0.9, 1.0, **box_props))
ax.text(0.07, 6.4, "- Place Bags in Incubation Room:\n  • Temp: 24-26°C\n  • RH: 80-90%\n  • Darkness\n- Monitor:\n  • Temperature Sensor\n  • Humidity Sensor\n  • CO₂ Sensor\n- Control Systems:\n  • HVAC (Heating/Cooling)\n  • Humidifier/Dehumidifier\n  • Ventilation Fans", **text_props)

# Fruit Induction
ax.add_patch(patches.Rectangle((0.05, 4.8), 0.9, 0.9, **box_props))
ax.text(0.07, 5.2, "- After 2-3 Weeks (100% Colonization)\n- Make Incisions/Remove Bag Tops\n- Light: 200-500 lux (12h on/12h off)\n- Lower CO₂ (<1000 ppm)\n- Maintain:\n  • Temp: 18-22°C\n  • RH: 90-95%", **text_props)

# Fruiting & Growth
ax.add_patch(patches.Rectangle((0.05, 3.8), 0.9, 0.8, **box_props))
ax.text(0.07, 4.1, "- Maintain Environmental Conditions:\n  • Temp: 18-22°C\n  • RH: 90-95%\n  • CO₂: 600-800 ppm\n  • Light: 200-500 lux\n- Monitor Growth:\n  • Mushroom Primordia Count\n  • Fresh Weight (Daily)", **text_props)

# Harvesting
ax.add_patch(patches.Rectangle((0.05, 2.8), 0.9, 0.7, **box_props))
ax.text(0.07, 3.05, "- Harvest at Optimal Maturity:\n  • Cut at Base\n  • Multiple Flushes (3-4 cycles)\n- Record Yield Data", **text_props)

# Post-Harvest Handling
ax.add_patch(patches.Rectangle((0.05, 1.8), 0.9, 0.7, **box_props))
ax.text(0.07, 2.05, "- Sort by Size/Quality\n- Clean (Brush Off Debris)\n- Quality Grading\n- Record Defects/Rejected Batches", **text_props)

# Packaging
ax.add_patch(patches.Rectangle((0.05, 0.8), 0.9, 0.7, **box_props))
ax.text(0.07, 1.05, "- Select Packaging Material:\n  • Breathable Bags/Trays\n  • Modified Atmosphere (MAP) Options\n- Package According to Grade:\n  • Label (Date, Batch No.)\n- Cold Storage (2-4°C) Until Shipment", **text_props)

# Distribution & Sales
ax.add_patch(patches.Rectangle((0.05, -0.2), 0.9, 0.8, **box_props))
ax.text(0.07, 0.1, "- Logistics:\n  • Cold Chain Transport\n  • Distributors/Wholesalers\n  • Direct-to-Retail (Supermarkets, Restaurants)\n- Marketing:\n  • Online Platforms\n  • Farmers’ Markets\n  • Institutional Buyers\n- Sales & Feedback:\n  • Customer Feedback Loops\n  • Production Planning Adjustment", **text_props)

# Draw arrows connecting each box
arrow_kwargs = dict(arrowstyle='->', lw=1.2)
y_vals = [16.5, 14.5, 11.7, 9.9, 8.5, 7.1, 5.85, 4.5, 3.25, 2.05, 1.05, -0.1]

for y in y_vals:
    ax.annotate('', xy=(0.5, y), xytext=(0.5, y + 0.8), arrowprops=arrow_kwargs)

plt.tight_layout()
plt.show()