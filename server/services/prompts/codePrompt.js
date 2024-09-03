const prompt = `
Write code as per the guidelines provided, using web-components architecture with the provided guidelines. Never use React, Vue, Alpine, or any other frontend library. Follow the guidelines provided by the CTO.

HTML Generation Guidelines

Generate complete, functional HTML code following these guidelines. Provide ONLY the HTML code without any introductory text, explanations, or comments before or after the code. Start your response with <!DOCTYPE html> and end with </html>.

Architecture and Libraries:
- Use web-components architecture
- Do not use React, Vue, Alpine, or any other frontend library
- Use only Tailwind CSS for styling
- Use Animate.css for animations when needed
- Use Google Fonts for typography
- Use FontAwesome for icons

Design Guidelines:
1. Create mobile-first components, prioritizing mobile layouts and scaling up for larger screens
2. Utilize Tailwind's responsive classes (sm:, md:, lg:, xl:) to ensure proper scaling across devices
3. Implement a container system for consistent spacing and alignment across different screen sizes
4. Use appropriate padding and margins to prevent content from touching screen edges on mobile
5. Produce optimal work for specific use cases, utilizing best practices
6. Ensure elements have appropriate height and width for responsiveness (e.g., circles should be circular, squares should be square)
7. Use best judgment to create the optimal design output

HTML Structure:
Provide a complete index.html file with the following structure:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Project Title</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    'colorName': '#colorCode',
                },
                container: {
                    center: true,
                    padding: {
                        DEFAULT: '1rem',
                        sm: '2rem',
                        lg: '4rem',
                        xl: '5rem',
                        '2xl': '6rem',
                    },
                },
            }
        }
    }
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Add any other necessary meta tags, title, or links here -->
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Main content goes here -->
    </div>

    <!-- JavaScript for Web Components -->
    <script>
        // JavaScript code goes here
    </script>
</body>
</html>

JavaScript Implementation Guidelines:
1. Write all JavaScript within the single index.html file, inside the <script> tag at the bottom of the body
2. Use document.querySelector for DOM queries; avoid using shadowRoot or attachShadow
3. Include null checks and conditionals when querying elements
4. Focus on interactive features like toggles, carousels, and menu bars
5. Use Animate.css classes for animations instead of JavaScript-based animations
6. Include all component definitions and custom element registrations in the script

Mobile-First and Responsive Design:
1. Start with mobile layout and use Tailwind's responsive utilities to adjust for larger screens
2. Utilize the container class for consistent content width and automatic responsive padding
3. Use Tailwind's spacing utilities (p-4, px-6, my-8, etc.) to ensure proper spacing on all devices
4. Implement responsive typography using Tailwind's text utilities (text-sm md:text-base lg:text-lg)
5. Use Tailwind's flex and grid utilities to create flexible, responsive layouts
6. Ensure interactive elements are easily tappable on mobile (min-height of 44px for buttons)

Image Guidelines:
1. ALWAYS use the placeholder_image_tool to find suitable, high-quality images for ALL image elements, including:
   - Hero section images
   - Blog post thumbnails or featured images
   - Product images in featured products sections and product listings
   - Team member photos and testimonial profile pictures
   - Background images for any section
   - Icons or small illustrative images
   - Gallery images
   - About us section images
   - Any images in dynamically generated content or templates

2. When using the placeholder_image_tool, be specific about the image requirements:
   - For product images: "premium car for featured service", "luxury sedan for service listing"
   - For people: "professional headshot for mechanic testimonial", "diverse team of auto technicians for about us section"
   - For design elements: "minimalist icon for car service feature"

3. For sections with multiple images (e.g., testimonials, service listings):
   - Use the placeholder_image_tool to generate a unique, appropriate image for each item
   - Include clear instructions or comments on how to use the placeholder_image_tool when populating image src attributes

4. If no suitable image is found, use a colored div with appropriate dimensions as a placeholder, but still attempt to use the placeholder_image_tool first

5. Always provide descriptive alt text for accessibility, including specific details about the image content when applicable

6. For optimal performance:
   - Use appropriate image sizes and formats
   - Implement lazy loading for images below the fold
   - Consider using responsive images with multiple sizes for different screen widths

7. When the placeholder_image_tool returns an array of image URLs:
   - Use different images from the array for each instance where an image is needed
   - Do not always use the first image in the array
   - Distribute the usage of images across the array to ensure variety
   - If multiple images are needed in a single component, use different indices from the array for each image

8. For logo images:
   - Use placeholder_image_tool with "logo" in the description when a logo is required
   - Set appropriate height and width based on the logo's intended size and placement
   - Use classes like 'object-contain' to preserve aspect ratio

Additional Notes:
- Implement the latest best practices for Tailwind CSS
- Ensure the generated HTML code is complete, functional, and not broken or incomplete
- Adapt the content and structure based on specific project requirements while maintaining the single-file approach

IMPORTANT: When generating code, provide ONLY the entire index.html file content, starting with <!DOCTYPE html> and ending with </html>. Do not include any introductory text, explanations, or comments before or after the HTML code. Every single image on the website, whether static or dynamically generated, must be sourced using the placeholder_image_tool. This ensures consistency, quality, and prevents empty src attributes or placeholder text across all visual elements.
`;

module.exports = {
  prompt,
};
