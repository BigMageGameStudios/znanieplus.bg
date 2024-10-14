import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartnerProvider} from '../providers';
import {SEOProvider} from 'src/app/providers';
import {IObjectKeys} from 'src/app/helpers/interfaces';
import {Loader} from "@googlemaps/js-api-loader"
import {MarkerClusterer} from "@googlemaps/markerclusterer";
import {CityCoords} from "./cityCoords";
import AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;

const loader = new Loader({
  apiKey: "AIzaSyCkjccHCYiCT3F1J4YKwGqS8c7AYyECg3U",
  version: "weekly",
});


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

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private PartnerProvider: PartnerProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private Router: Router,
    private SEOProvider: SEOProvider,
  ) {

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
    this.partners = partners;

    this.page = Number(page) + 1;
    this.skip = Number(page) * this.limit;
    this.filters = types;
    this.cities = cities;
    this.filtered = partners;

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
          <div class="info-window-address">${partner.address}</div>
          <div class="info-actions-container">
            <div class="info-window-phone"><a href="tel:${partner.phone}">${partner.phone}</a></div>
            <div class="info-window-website"><a href="${partner.website}" target="_blank">${partner.website}</a></div>
          </div>
          <div class="info-window-see-more-container">
            <div class="info-window-see-more-button">
                <a href="/partner/${partner.id}">Виж Повече</a>
            </div>  
          </div>
        </div>
      `
  }

  mapCleanUp () {
    this.markers?.forEach(marker => {
      marker.map = null
    })
    this.cluster?.setMap(null)
  }

  onPartnerClick (partner: IObjectKeys) {
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
    }
  }

  calcDistance(p1: google.maps.LatLng, p2: google.maps.LatLng) {
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  }

  checkNear (userLocation: google.maps.LatLng, marker: AdvancedMarkerElement) {
    if (marker) {
      const point2 = new google.maps.LatLng(marker.position.lat as number, marker.position.lng as number);

      return this.calcDistance(userLocation, point2)
    }
    return 9999
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

  async onLocation () {
    this.locationLoading = true
    if (!this.location) {
      this.filtered = this.partners
      this.map.setCenter({lat: 42.69, lng: 23.34})
      this.map.setZoom(12)
      this.onMapLoaded()
      this.ChangeDetectorRef.markForCheck();
      this.locationLoading = false
      return
    }

    const location = await this.getCurrentLocation() as {lat: number; lng: number};
    const point = new google.maps.LatLng(location.lat, location.lng);
    const nearPartners = this.filtered.filter(partner => {
      const marker = this.markers.find(marker => {
        return marker.title === partner.name
      })
      const distance = this.checkNear(point, marker)
      return Number(distance) < 25
    })

    this.filtered = nearPartners
    this.map.setCenter(point)
    this.map.setZoom(12)
    this.onMapLoaded()
    this.ChangeDetectorRef.markForCheck();
    this.locationLoading = false
  }

  async onMapLoaded() {
    this.markers = this.filtered.filter(partner => {
      return Boolean(partner.latitude)
    }).map(partner => {
      this.mapCleanUp()
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
            {map: this.map,
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

  setMapCoords () {
    const city = this.cities.find(city => city.id === this.city)
    const coords = CityCoords?.[this.city] ?? {lat: 42.69, lng: 23.34}
    this.map.setCenter(coords)
    this.map.setZoom(12)
  }

  onMapUpdate () {
    this.onMapLoaded()
    this.setMapCoords()
  }

  onFilter() {
    this.filtered = this.partners.filter((item) => {
      const name = item.name.toLowerCase();
      if (name.includes(this.filterText.toLocaleLowerCase())) {
        return true;
      }
      return false;
    });

    this.onMapUpdate()
    this.ChangeDetectorRef.markForCheck();
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

        if (reset) {
          this.partners = data;
          this.filtered = data;
          this.loaded = false;
        } else {
          const arr = [...this.partners, ...data];
          this.partners = arr;
          this.filtered = arr;
        }

        if (data.length < this.limit) {
          this.loaded = true;
        }

        this.ChangeDetectorRef.markForCheck();
        this.onMapUpdate()
      });
    }
  }

}
