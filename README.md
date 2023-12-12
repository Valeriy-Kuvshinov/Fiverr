# Giggler
a React Freelance Service Marketplace Project

## Overview

Welcome to Giggler, our freelancing marketplace where you could get assistant from professionals for a cheap price from all around the world,
dont hesistate to look at a user' profile or their service' reviews for better reasurance the service is to your liking.

## Features

- **rich variety**: In our app you can find many options for every service in different prices from different regions in multiple languages so all of our users could get the service they need.

- **quick service**: In the gig page any user can start a chat with the seller to get furthur details before spending your precious hard earned money, you may always look back previous chat in the chats page.

- **immediate notifications**: Thanks to the usage of sockets, a way to notify the computer that a action was made, a user will get a immediate notifcation.

## Behind the Scenes Features

- **redux**: We use the store with reducers and actions to use the data across the website with updating at real time

- **socket**: For real time updates of orders, reviews and the chat feature, we use the socket npm library so each user, either the freelancer or the one ordering the gig, will be updated at moment notice

- **mongoDb**: The method of storage for the users, gigs, orders, reviews and chats are all inside collections in a database using MongoDb, the demodata used in the website was made by us, the developer team.

- **cloudinary**: to store our images, user provided images and some svgs we used Cloudinary as our storage service, it even deletes unused images provided by users to not waste the storage space.

## Getting Started

To begin using the Weather Reports project, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/weather-reports.git
   cd weather-reports
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure API Keys:**
   Obtain API keys for the weather data sources you intend to use and update the configuration files accordingly.

4. **Run the Application:**
   ```bash
   python app.py
   ```

   Access the application at [http://localhost:8000](http://localhost:8000) in your web browser.

## Data Sources

The Weather Reports project supports data retrieval from the following sources:

- OpenWeatherMap API
- NOAA (National Oceanic and Atmospheric Administration)
- Weather Data Providers

Ensure you have valid API keys and credentials for the chosen data sources.

## Contributing

Community contributions are welcomed. If you have ideas for new features, improvements, or bug fixes, please open an issue or submit a pull request. Check out our [contribution guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to contributors and open-source projects that inspired and supported the development of this Weather Reports project.

Enjoy exploring and analyzing weather data with the Weather Reports project! If you have any questions or feedback, feel free to reach out.

Happy coding! 🌦️
