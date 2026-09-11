# Student Photo Mapping — flyer → success story

Every flyer in `mokkamamma-attachments/` was opened, the **name printed on the flyer**
was read, and matched to the `SUCCESS_STORIES` entry with that exact `studentName`.
The passport photo was then cropped out of the flyer and saved as the student's
`studentPhoto`. Matching was by name only — never by position or guesswork.

## Matched (19)

| Flyer | Name on flyer | Role on flyer | Bank on flyer | Story id | Saved as |
| --- | --- | --- | --- | --- | --- |
| 490.png | Shiv Singh Rathore | Credit Officer | Axis Bank | story-shiv-singh-rathore | shiv-singh-rathore.jpg |
| 494.png | Simran Shukla | Junior Relationship Officer | Axis Bank | story-simran-shukla | simran-shukla.jpg |
| 495.png | Rashmi Rani | CRO/Teller | Bandhan Bank | story-rashmi-rani | rashmi-rani.jpg |
| 496.png | Aishwarya Tiwari | Asst. Manager | Axis Bank | story-aishwarya-tiwari | aishwarya-tiwari.jpg |
| 500.png | Akash Mishra | Assistant Manager | Kotak Mahindra | story-akash-mishra | akash-mishra.jpg |
| 501.png | Divya Singh | Assistant Manager | Kotak Mahindra | story-divya-singh | divya-singh.jpg |
| 505.png | Deeksha Singh | Sr. Officer | Indiabulls Home Loans | story-deeksha-singh | deeksha-singh.jpg |
| 507.png | Gautam Kumar Bhasker | Assistant Manager | Kotak Mahindra | story-gautam-bhasker | gautam-bhasker.jpg |
| 509.png | Darshit Dwivedi | CRO/Teller | Bandhan Bank | story-darshit-dwivedi | darshit-dwivedi.jpg |
| 510.png | Sashi Sharma | Officer | HDFC Bank | story-sashi-sharma | sashi-sharma.jpg |
| 511.png | Tanu Agarwal | Officer | HDFC Bank | story-tanu-agarwal | tanu-agarwal.jpg |
| 514.png | Hardik Saxena | Officer | Indiabulls Home Loans | story-hardik-saxena | hardik-saxena.jpg |
| 516.png | Ashwini Kumar | Officer | HDFC Bank | story-ashwini-kumar | ashwini-kumar.jpg |
| 517.png | Atul Singh | Asst. Manager | Kotak Mahindra | story-atul-singh | atul-singh.jpg |
| 519.png | Akansha Singh | Assistant Manager | Kotak Mahindra | story-akansha-singh | akansha-singh.jpg |
| 520.png | Shivani Shrivastava | Assistant Manger [sic] | IndusInd Bank | story-shivani-shrivastava | shivani-shrivastava.jpg |
| 521.png | Deeksha Tiwari | Sr. Officer | Indiabulls Home Loans | story-deeksha-tiwari | deeksha-tiwari.jpg |
| 525.png | Gopi Chand | Officer | HDFC Bank | story-gopi-chand | gopi-chand.jpg |
| 526.png | Gauri Dixit | Banking Associate | RBS | story-gauri-dixit | gauri-dixit.jpg |

## Flyer with no matching story (1)

| Flyer | Name on flyer | Note |
| --- | --- | --- |
| 518.png | **Anjani Sharma** (Officer, HDFC Bank) | No `SUCCESS_STORIES` entry carries this name. Left unused rather than forced onto an unrelated student. |

## Second batch — 2026-09-11 (the final 5)

| Flyer | Name on flyer | Role / Bank on flyer | Story id | Saved as |
| --- | --- | --- | --- | --- |
| 499.png | Gaurav Jaisawal | Phone Banker · HDB Financial Services | story-gaurav-jaisawal | gaurav-jaisawal.jpg |
| 503.png | Priya Prajapati | Officer · HDFC Bank | story-priya-prajapati | priya-prajapati.jpg |
| 512.png | Lovely Gupta | CRM · Indiabulls Home Loans | story-lovely-gupta | lovely-gupta.jpg |
| 513.png | Saurabh Mishra | Officer · HDFC Bank | story-saurabh-mishra | saurabh-mishra.jpg |
| 516.png | **Ashwini Kumar** | Officer · HDFC Bank | **story-govind-trivedi** | govind-trivedi.jpg |

**All 24 success stories now carry a real flyer headshot. No stock placeholders remain.**

### ⚠️ Govind Trivedi uses the Ashwini Kumar flyer — by client instruction

The client's 2026-09-11 message said: *"use ashwini kumar for Govind Trivedi, rest align with
respective names."* `516.png` was re-sent in the second batch and is **byte-identical**
(md5 `b35aa905…`) to the `516.png` already used for `story-ashwini-kumar`.

Consequence: **`ashwini-kumar.jpg` and `govind-trivedi.jpg` are the same image** (md5
`4c4277ba…`), so the same face now appears on two cards — Ashwini Kumar (Assistant Manager,
Kotak Mahindra) and Govind Trivedi (Junior Associate, State Bank of India). This was done
exactly as instructed, but if a distinct photo of Govind Trivedi exists it should replace it.

## Bank differs between flyer and site copy (4)

Name matching is exact in all four cases; only the bank on the flyer disagrees with the
bank in the site's story text. **The site copy was NOT changed** — please confirm which is
correct and it will be corrected.

| Student | Bank on site | Bank on flyer |
| --- | --- | --- |
| Deeksha Singh | Kotak Mahindra Bank | Indiabulls Home Loans |
| Sashi Sharma | Axis Bank | HDFC Bank |
| Ashwini Kumar | Kotak Mahindra Bank | HDFC Bank |
| Gopi Chand | HDB Financial Services | HDFC Bank |
| Lovely Gupta | HDFC Bank (Officer) | Indiabulls Home Loans (CRM) |
| Govind Trivedi | State Bank of India (Junior Associate) | flyer used is Ashwini Kumar's: HDFC Bank (Officer) |
