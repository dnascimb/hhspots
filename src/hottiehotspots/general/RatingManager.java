package hottiehotspots.general;

import hottiehotspots.model.Hotspot;
import hottiehotspots.model.HotspotRating;
import hottiehotspots.service.HotspotService;

import java.util.Iterator;

public class RatingManager {
	
	HotspotService service;
	
	public RatingManager()
	{
		
	}
	
	public Double calculateTemperature(int rating)
	{
		return calculateTemperature(null, rating);
	}
	
	public Double calculateTemperature(Hotspot hs, int rating)
	{
		Double newRating = 0.0;
		
		if(hs == null)
		{
			// first time rating so just multiply by a factor of 20 to establish temp
	    	newRating = new Double(rating * 20);
	    		
		}
		else
		{
			Iterator iter = hs.getRatings().iterator();
			int totalRatings = 0;
			double totalRatingValue = 0;
			while(iter.hasNext())
			{
				HotspotRating curRating = (HotspotRating)iter.next();
				totalRatings++;
				totalRatingValue += curRating.getRating();
			}
			
			// add the new rating to the collection
			totalRatings++;
			totalRatingValue += rating * 20;
			
			newRating = totalRatingValue/totalRatings;
		
		}
		
		return newRating;
	}

}
