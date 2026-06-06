# PEER Structural Performance Database

Source: https://nisee.berkeley.edu/spd/index.html

Downloaded on: 2026-06-06

This directory stores the reinforced concrete column test data from the PEER Structural Performance Database.

## Contents

- `source_pages/`: copied index, search, about, and all-record search result pages.
- `manual/`: downloaded user manual PDF.
- `properties/`: tab-delimited property tables.
  - `rectangular_properties.txt`: 253 rectangular column records.
  - `spiral_properties.txt`: 163 spiral or circular hoop column records.
- `records_xml/`: 416 per-record XML detail files.
- `records_html/`: 416 per-record HTML detail files.
- `force_displacement_data/`: downloaded external resources referenced by the XML records, including force-displacement data and available figures/reports.
- `resource_links.csv`: all resource links extracted from the XML records.
- `download_status.csv`: download status for each extracted resource link.
- `retry_failed_resources.csv`: retry results for old PEER image links using HTTPS/current-host alternatives.
- `download_summary.json`: machine-readable download summary.

## Download Summary

- Records: 416
- XML detail files: 416
- HTML detail files: 416
- Extracted resource links: 575
- Downloaded resources: 556
- Failed resources: 19

All 414 force-displacement `data` resources were downloaded successfully. The 19 failed links are old external website/photo/diagram links that currently return 404 or are unreachable; see `download_status.csv` and `retry_failed_resources.csv`.
