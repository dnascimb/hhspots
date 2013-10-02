package hottiehotspots.general;

public class HHProperties {
	private String geoIPDATLocation = "";
	private String imageLocation = "";
	private String imageLocationURL = "";
	private String imageStockURL = "";

	public void setGeoIPDATLocation(String geoIPDATLocation) {
		this.geoIPDATLocation = geoIPDATLocation;
	}

	public String getGeoIPDATLocation() {
		return geoIPDATLocation;
	}

	public String getImageLocation() {
		return imageLocation;
	}

	public void setImageLocation(String imageLocation) {
		this.imageLocation = imageLocation;
	}
	
	public String getImageLocationURL() {
		return imageLocationURL;
	}

	public void setImageLocationURL(String imageLocationURL) {
		this.imageLocationURL = imageLocationURL;
	}

	public String getImageStockURL() {
		return imageStockURL;
	}

	public void setImageStockURL(String imageStockURL) {
		this.imageStockURL = imageStockURL;
	}
}
