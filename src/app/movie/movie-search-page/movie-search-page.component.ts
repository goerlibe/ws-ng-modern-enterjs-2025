import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { injectParams } from 'ngxtension/inject-params';

import { MovieService } from '../movie.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'movie-search-page',
  template: `
    @if (movies.hasValue()) {
      <movie-list [movies]="movies.value()!" />
    }

    @if (movies.isLoading()) {
      <div class="loader"></div>
    }

    @if (movies.error()) {
      <div class="error">
        There are no movies to show.
        {{ movies.error() }}
      </div>
    }
  `,
  imports: [MovieListComponent],
})
export class MovieSearchPageComponent {
  private movieService = inject(MovieService);
  private queryParam = injectParams((p) => p['query'] as string);

  protected moviesResource = rxResource({
    request: this.queryParam,
    loader: (p) => {
      const query = p.request;
      return this.movieService.searchMovies(query!);
    },
  });

  movies = rxResource({
    request: this.queryParam,
    loader: ({ request: query }) => this.movieService.searchMovies(query),
  });
}
