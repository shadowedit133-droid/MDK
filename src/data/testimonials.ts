export interface TestimonialItem {
  id: string;
  clientIdentifier: string;
  country?: string;
  projectScope: string;
  rating: number;
  reviewText: string;
  date?: string;
}

export const testimonialsConfig = {
  sectionTitle: "Client Feedback",
  sectionSubtitle: "Verified client feedback from Upwork.",
  totalUpworkReviewsCount: 12,
  averageRating: 5.0,
  showTestimonialsCarousel: true,
  items: [] as TestimonialItem[],
};

