import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartnerProvider} from '../providers';
import {SEOProvider} from 'src/app/providers';
import {IObjectKeys} from 'src/app/helpers/interfaces';
import {Loader} from "@googlemaps/js-api-loader"
import {MarkerClusterer} from "@googlemaps/markerclusterer";
import {CityCoords} from "./cityCoords";

const loader = new Loader({
  apiKey: "AIzaSyCkjccHCYiCT3F1J4YKwGqS8c7AYyECg3U",
  version: "weekly",
});


type Point = {
  lat: number;
  lng: number;
}

@Component({
  selector: 'partners-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PartnersComponent {
  markers: google.maps.marker.AdvancedMarkerElement[]
  cluster: MarkerClusterer
  partners: IObjectKeys[] = [];
  AllPartners: IObjectKeys[] = [];
  isMapLoaded = false;

  skip = 0;
  limit = 300;
  loaded = false;
  online = false;
  location = false;
  locationLoading = false;
  filters = [];
  filter = this.filters[0]
  cities = [];
  city = this.cities[0];
  page = 1;
  filterText = "";
  filtered: IObjectKeys[] = [];
  map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;

  centerLocation: google.maps.LatLng | undefined;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private PartnerProvider: PartnerProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private Router: Router,
    private SEOProvider: SEOProvider,
  ) {

    this.centerLocation = null

    loader.load().then(async () => {
      const {Map} = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      await google.maps.importLibrary("marker");
      await google.maps.importLibrary("geometry");
      this.map = new Map(document.getElementById("map") as HTMLElement, {
        center: {lat: 42.69, lng: 23.34},
        zoom: 12,
        mapId: 'objects-map',
      });


      this.infoWindow = new google.maps.InfoWindow({
        content: `<div></div>`,
        ariaLabel: "Uluru",
      });

      this.onMapLoaded()
    });

    const {partners = [], types = [], cities = []} = ActivatedRoute.snapshot.data.data;
    const {page = 1} = ActivatedRoute.snapshot.queryParams;
    this.AllPartners = partners.slice(0);
    this.partners = partners;

    this.page = Number(page) + 1;
    this.skip = Number(page) * this.limit;
    this.filters = types;
    this.cities = cities;
    this.filtered = partners.filter(item => item.priority !== 0);

    this.filters.unshift({
      id: null,
      type: 'Всички обекти'
    })

    this.cities.unshift({
      id: null,
      name: 'Всички градове'
    })

    if (partners.length < this.limit) {
      this.loaded = true;
    }

    this.SEOProvider.set({
      title: `ЗНАНИЕ+ | Обекти`,
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'ЗНАНИЕ,карта,отстъпка,култура,социална придобивка,znanieplus,ЗНАНИЕ плюс,ЗНАНИЕплюс,znanie plus,znanie+,ЗНАНИЕ+',
      ogUrl: 'https://www.znanieplus.bg/partners',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/FB_Znanie+_2000x2000_09.jpg',
      canonicalURL: `/partners`
    });

  }

  contentWindow (partner: IObjectKeys) {
    return `
        <div class="info-window-content">
          <div class="info-window-image">
            <img src="https://dashboard.znanieplus.bg/storage/${partner.logo}" alt="${partner.name}"/>
          </div>
          <div class="info-window-name">${partner.name}</div>
          <div class="info-window-address">
              <a href="https://www.google.com/maps/@${partner.latitude},${partner.longitude},18z" target="_blank">${partner.address}</a>
          </div>
          <div class="info-actions-container">
            <div class="info-window-phone"><a href="tel:${partner.phone}">${partner.phone}</a></div>
            <div class="info-window-website"><a href="${partner.website}" target="_blank">Страница на обекта</a></div>
          </div>
          <div class="info-window-see-more-container">
            <div class="info-window-see-more-button">
                <a href="/partner/${partner.id}">Виж Повече</a>
            </div>  
          </div>
        </div>
      `
  }

  mapCleanUp() {
    this.markers?.forEach(marker => {
      marker.map = null
    })
    this.cluster?.setMap(null)
  }

  onPartnerClick(partner: IObjectKeys) {
    if (partner.online) {
      this.Router.navigate(['/partner', partner.id])
      return
    }
    if (!partner.latitude || !partner.longitude) {
      return
    }
    this.map.setCenter({lat: partner.latitude, lng: partner.longitude})
    this.map.setZoom(17)

    const marker = this.markers.find(marker => {
      return marker.title === partner.name
    })

    if (marker) {
      this.infoWindow.setContent(this.contentWindow(partner))
      this.infoWindow.open({
        anchor: marker,
        map: this.map,
      });

      const map = document.querySelector('#map')


      const element1 = document.querySelector('.section-title')
      const element2 = document.querySelector('.section-row')

      const rect = element1.getBoundingClientRect()
      const rect2 = element2.getBoundingClientRect()

      const scrollTo =  rect.height + rect2.height

      window.scrollTo({
        top: scrollTo ?? 0,
        behavior: 'smooth'
      })
    }
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                lng,
              };
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  async onLocation() {
    if (this.locationLoading) return
    this.online = false
    this.location = !this.location;
    this.locationLoading = true
    if (!this.location) {
      this.filtered = this.partners
      this.centerLocation = null
      this.onFilter()
      this.map.setCenter(CityCoords[1])
      this.map.setZoom(12)
      this.onMapLoaded()
      this.ChangeDetectorRef.markForCheck();
      this.locationLoading = false
      return
    }

    const location = await this.getCurrentLocation() as { lat: number; lng: number };
    const point = new google.maps.LatLng(location.lat, location.lng);
    this.centerLocation = point

    const nearPartners = this.AllPartners.filter(partner => {
      const distance = this.distance(location, {lat: partner.latitude, lng: partner.longitude}, 'K')
      return Number(distance) < 25
    })

    this.partners = nearPartners
    this.filtered = nearPartners.filter(partner => partner.priority !== 0)
    this.map.setCenter(this.centerLocation)
    this.map.setZoom(12)
    this.ChangeDetectorRef.markForCheck();
    this.onMapLoaded()
    this.locationLoading = false
  }


  async onMapLoaded() {
    this.mapCleanUp()
    this.markers = this.partners.filter(partner => {
      return Boolean(partner.latitude)
    }).map(partner => {
      const pin = document.createElement('img')
      pin.src = '/assets/images/pin.png'
      pin.setAttribute('width', '36')
      pin.setAttribute('height', '36')
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: this.map,
        position: {lat: partner.latitude, lng: partner.longitude},
        title: partner.name,
        content: pin,
      })

      marker.addListener("click", () => {
        this.infoWindow.setContent(this.contentWindow(partner))
        this.infoWindow.open({
          anchor: marker,
          map: this.map,
        });
      })

      return marker
    });


    this.cluster = new MarkerClusterer({
      markers: this.markers,
      map: this.map,
      renderer: {
        render: ({position, count}) => {
          const markerImage = document.createElement('div');
          markerImage.classList.add('cluster-content')
          markerImage.textContent = String(count)
          markerImage.setAttribute("style", `
                width: 36px;
                height: 36px;
                background-color: #F7BC3C;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                border-radius: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);
          `)

          return new google.maps.marker.AdvancedMarkerElement(
            {
              map: this.map,
              position: position,
              title: String(count),
              content: markerImage
            }
          );
        }
      }
    })
  }

  track(index, item) {
    return item.id;
  }

  setMapCoords() {
    const city = this.cities.find(city => city.id === this.city)
    const coords = CityCoords?.[this.city] ?? {lat: 42.69, lng: 23.34}
    if (this.centerLocation) {
      this.map.setCenter(this.centerLocation)
    } else {
      this.map.setCenter(coords)
      this.map.setZoom(12)
    }
  }

  onMapUpdate() {
    this.onMapLoaded()
    this.setMapCoords()
  }

  onFilter() {
    // this.location = false

    this.partners = this.AllPartners.filter((item) => {
      return item.name.toLowerCase().includes(this.filterText.toLocaleLowerCase());
    });

    this.filtered = this.AllPartners.filter(item => {
      if (this.filterText === '') {
        return item.priority !== 0
      }

      return item.name.toLowerCase().includes(this.filterText.toLocaleLowerCase());
    })

    this.ChangeDetectorRef.markForCheck();
    this.onMapUpdate()
  }

  onSort() {
    this.skip = 0;
    this.limit = 300;
    this.page = 1;
    this.onLoadMore(true);
    this.Router.navigate([], {
      state: {
        disableScroll: true
      },
      replaceUrl: true,
      relativeTo: this.ActivatedRoute,
      queryParams: {
        page: 1,
      }
    });
  }

  filterNear() {
    const presentAll = (!this.city && !this.filter)
    if (this.location && this.centerLocation) {
      const location = {lat: this.centerLocation.lat(), lng: this.centerLocation.lng()}
      const nearPartners = this.AllPartners.filter(partner => {
        const distance = this.distance(location, {lat: partner.latitude, lng: partner.longitude}, 'K')
        return Number(distance) < 25
      })
      this.filtered = nearPartners.filter(partner => {
        if (presentAll) {
          return partner.priority !== 0
        }
        return true
      })
    } else {
      this.filtered = this.AllPartners.slice(0).filter(partner => {
        if (presentAll) {
          return partner.priority !== 0
        }
        return true
      })
    }
  }

  onLoadMore(reset?) {
    if (!this.loaded || reset) {
      this.Router.navigate([], {
        state: {
          disableScroll: true
        },
        replaceUrl: true,
        relativeTo: this.ActivatedRoute,
        queryParams: {
          page: this.page,
        }
      });
      this.PartnerProvider.getList({
        skip: this.skip,
        limit: this.limit,
        type: this.filter,
        online: this.online,
        city: this.city
      }).subscribe((data) => {
        this.page++;
        this.skip += this.limit;

        const presentAll = (!this.city && !this.filter)

        if (reset) {
          this.AllPartners = data.slice(0)
          this.partners = data;
          this.loaded = false;
        } else {
          const arr = [...this.partners, ...data];
          this.AllPartners = arr.slice(0);
          this.partners = arr;
        }

        if (data.length < this.limit) {
          this.loaded = true;
        }

        this.filterNear()

        this.ChangeDetectorRef.markForCheck();
        this.onMapUpdate()
      });
    }
  }

  distance (point1: Point, point2: Point, unit: string = 'M') {
    const {lat: lat1, lng: lon1} = point1
    const {lat: lat2, lng: lon2} = point2

    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

}
