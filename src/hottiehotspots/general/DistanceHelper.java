package hottiehotspots.general;

public final class DistanceHelper {

    private final static double MILES_UNIT = 1.1515;
    private final static double KILOMETERS_UNIT = 1.609344;
    private final static double NAUTICAL_MILES_UNIT = 0.8684;
    
	private double distance(double lat1, double lon1, double lat2, double lon2) {
		  double theta = lon1 - lon2;
		  double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
		  dist = Math.acos(dist);
		  dist = rad2deg(dist);
		  return dist;
	}	  
		  
	/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	/*::  This function converts decimal degrees to radians             :*/
	/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	private double deg2rad(double deg) {
	  return (deg * Math.PI / 180.0);
	}

	/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	/*::  This function converts radians to decimal degrees             :*/
	/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	private double rad2deg(double rad) {
	  return (rad * 180.0 / Math.PI);
	}

	public double calcMiles(double lat1, double lon1, double lat2, double lon2) {
		return distance(lat1, lon1, lat2, lon2) * 60 * MILES_UNIT; //miles
	}
	
	public double calcKilometers(double lat1, double lon1, double lat2, double lon2) {
		return distance(lat1, lon1, lat2, lon2) * KILOMETERS_UNIT;
	}
	
	public double calcNauticalMiles(double lat1, double lon1, double lat2, double lon2) {
		return distance(lat1, lon1, lat2, lon2) * NAUTICAL_MILES_UNIT;
	}
}
